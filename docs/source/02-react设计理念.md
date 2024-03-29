---
sidebar_position: 2
---

# React设计理念

## 异步可中断

React15慢在哪里，哪些因素导致了react变慢？

React15之前的协调过程是同步的，也叫stack reconciler，js的执行是单线程的，与GUI绘制互斥，导致在更新比较耗时的任务时，不能及时响应一些高优先级的任务，比如用户输入，导致页面卡顿，这是**cpu的限制**。

假设我们在单线程的环境里遇到了比较耗时的代码计算会想到怎么解决呢？

首先我们可能会将任务分割，让它能够被中断，在其他任务到来的时候让出执行权，当其他任务执行后，再从之前中断的部分开始异步执行剩下的计算。所以关键是实现一套**异步可中断的方案**。

该方案中提到任务分割，异步执行，并且能让出执行权，由此可以带出react中的三个概念

**Fiber：**

react15的更新是同步的，它不能将任务分割，所以需要一套数据结构让它既能对应真实的dom又能作为分隔的单元，这就是Fiber。

Fiber可以对应真实节点，也可以对应类或函数组件，而最后的更新都是要应用到真实节点上的，所以Fiber能作为动态的工作单元

使用伪代码来实现该过程：

```js
let firstFiber
let nextFiber = firstFiber
let shouldYield = false
//firstFiber->firstChild->sibling
function performUnitOfWork(nextFiber) {
    //...
    return nextFiber.next
}

function workLoop(deadline) {
    while (nextFiber && !shouldYield) {
        nextFiber = performUnitOfWork(nextFiber); // 执行完当前节点得到下一个节点
        shouldYield = deadline.timeReaming < 1; // 没有空余时间
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
```

**Scheduler：**

有了Fiber，我们就需要用浏览器的时间片异步执行这些Fiber的工作单元，浏览器有一个api叫做`requestIdleCallback`，它可以在浏览器空闲的时候执行一些任务，我们用这个api执行react的更新，让高优先级的任务优先响应，但是`requestIdleCallback`存在着浏览器的兼容性和触发不稳定的问题，所以需要用实现一套自己的**时间片运行机制**，在react中这部分叫做scheduler。

**Lane：**

有了异步调度，我们还需要细粒度的管理各个任务的优先级，让高优先级的任务优先执行，各个Fiber工作单元还能比较优先级，相同优先级的任务可以一起更新

**产生出来的上层实现**

由于有了这一套异步可中断的机制，我们就能实现batchedUpdates批量更新和Suspense中止

下图就是使用异步可中断前后的更新过程对比：

![20220830223636](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202208302306235.png!blog.guiyexing)

前者的更新过程会一直持续下去，且中间不能被打断，后者可以定义一个时间片，在这个时间片之内，如果fiber没有执行完就会让出执行权，达到每一段就相当于一个工作单元的效果

## 代数效应

除了cpu的瓶颈问题，还有一类问题是和**副作用**相关的问题，比如获取数据、文件操作等。不同设备性能和网络状况都不一样，react怎样去处理这些副作用，让我们在编码运行应用时表现一致呢，这就需要react有**分离副作用**的能力，为什么要分离副作用呢，因为要解耦，这就是代数效应(Algebraic Effects)。

提问：我们都写过获取数据的代码，在获取数据前展示loading，数据获取之后取消loading，假设我们的设备性能和网络状况都很好，数据很快就获取到了，那我们还有必要在一开始的时候展示loading吗？如何才能有更好的用户体验呢？

以下示例，getPrice是一个异步获取数据的方法，我们可以用async+await的方式获取数据，但是这会导致调用getTotalPrice的run方法也会变成异步函数，这就是async的传染性，所以没法分离副作用。

```js
function getPrice(id) {
    return fetch(`xxx.com?id=${productId}`).then((res) => {
        return res.price
    })
}

async function getTotalPirce(id1, id2) {
    const p1 = await getPrice(id1);
    const p2 = await getPrice(id2);

    return p1 + p2;
}

async function run() {
    await getTotalPrice('001', '002');
}
```

现在改成下面这段代码，其中perform和handle是虚构的语法，当代码执行到perform的时候会暂停当前函数的执行，并且被handle捕获，handle函数体内会拿到productId参数获取数据之后resume价格price，resume会回到之前perform暂停的地方并且返回price，这就完全把副作用分离到了getTotalPirce和getPrice之外。

这里的关键流程是perform暂停函数的执行，handle获取函数执行权，resume交出函数执行权。

```js
function getPrice(id) {
    const price = perform id;
    return price;
}

function getTotalPirce(id1, id2) {
    const p1 = getPrice(id1);
    const p2 = getPrice(id2);

    return p1 + p2;
}

try {
    getTotalPrice('001', '002');
}
handle(productId) {
    fetch(`xxx.com?id=${productId}`).then((res) => {
        resume with res.price
    })
}
```

但是这些语法毕竟是虚构的，看以下代码把getPrice换成usePrice，getTotalPirce换成TotalPirce组件，是不是有点熟悉呢，这就是hook分离副作用的能力。

```js
function usePrice(id) {
    useEffect((id) => {
        fetch(`xxx.com?id=${productId}`).then((res) => {
            return res.price
        })
    }, [])
}

function TotalPirce({
    id1,
    id2
}) {
    const p1 = usePrice(id1);
    const p2 = usePrice(id2);

    return <ShowTotal props = {
        ...
    } >
}
```

我们知道generator也可以做到程序的暂停和恢复，但是generator暂停之后的恢复执行，还是得把执行权交换给直接调用者，调用者会沿着调用栈继续上交，所以也是有传染性的，并且generator不能计算优先级，排序优先级。

```js
function getPrice(id) {
    return fetch(`xxx.com?id=${productId}`).then((res) => {
        return res.price
    })
}

function* getTotalPirce(id1, id2) {
    const p1 = yield getPrice(id1);
    const p2 = yield getPrice(id2);

    return p1 + p2;
}

function* run() {
    yield getTotalPrice('001', '002');
}
```

**解耦副作用**在函数式编程的实践中非常常见，例如redux-saga，将副作用从saga中分离，自己不处理副作用，只负责发起请求

```js
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
```

严格意义上讲react是不支持Algebraic Effects的，但是react有Fiber，可以把状态或者是更新，还有一些副作用都存入Fiber，更新的时候只需要更新Fiber上的副作用就可以了，执行完这个Fiber的更新之后交还执行权给浏览器，让浏览器决定后面怎么调度，由此可见Fiber得是一个链表结构才能达到这样的效果

Suspense也是这种概念的延伸，先看个例子

```js
const ProductResource = createResource(fetchProduct);

const Proeuct = (props) => {
    // 用同步的方式来编写异步代码!
  const p = ProductResource.read(props.id);
  return <h3>{p.price}</h3>;
}

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Proeuct id={123} />
      </Suspense>
    </div>
  );
}
```

可以看到ProductResource.read完全是同步的写法，把获取数据的部分完全分离出了Proeuct组件之外，在源码中，ProductResource.read会在获取数据之前会throw一个特殊的Promise，由于scheduler的存在，scheduler可以捕获这个promise，暂停更新，等数据获取之后交还执行权。ProductResource可以是localStorage甚至是redis、mysql等数据库，也就是组件即服务，可能以后会有server Component的出现。
