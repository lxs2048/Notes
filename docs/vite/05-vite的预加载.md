# vite的预加载

```js
import _ from "lodash"; // lodash可能也import了其他的东西
```

vite在处理的过程中如果看到有非绝对路径或者相对路径的引用, 他会尝试开启路径补全

```js
import _ from "/node_modules/.vite/lodash";

import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=ebe57916";
```

![image-20221022153451634](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202210221534730.png!blog.guiyexing)

**找寻依赖的过程是自当前目录依次向上查找的过程, 直到搜寻到根目录或者搜寻到对应依赖为止**

生产和开发的区别：

* vite在开发环境使用依赖预构建
* vite在生产环境会全权交给rollup的库去完成打包

有的第三方包，比如react使用commonjs规范的导出`module.exports`，vite使用依赖预构建。

**依赖预构建**: 首先vite会找到对应的依赖, 然后调用esbuild(对js语法进行处理的一个库), 将其他规范的代码转换成esmodule规范, 然后放到当前目录下的`node_modules/.vite/deps`, 同时对esmodule规范的各个模块进行统一集成

```js
// a.js
export default function a() {}
```

```js
//index.js
export { default as a  } from "./a.js"
```

vite重写以后
```js
//index.js
function a() {}
```

他解决了3个问题:
1. 不同的第三方包会有不同的导出格式(这是vite没法约束的事情)
2. 对路径的处理上可以直接使用.vite/deps, 方便路径重写（当安装新包，并导入的时候就可以在.vite/deps中看到编译后的结果）
3. **网络多包传输的性能问题**(也是原生esmodule规范不敢支持node_modules的原因之一)，我们知道使用import导入的每个模块，都会重新发一次网络请求，有了依赖预构建以后无论他有多少的额外export和import，**vite都会尽可能的将他们进行集成最后只生成一个或者几个模块**

我们安装loadsh的esmodule的形式`lodash-es`

```
npm i lodash-es
```

可以看到`lodash-es`导出了许多的模块

![image-20221022154929029](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202210221549060.png!blog.guiyexing)

而在网络请求里我们可以看到vite把他重写了，即把模块进行统一集成

![image-20221022155136007](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202210221551037.png!blog.guiyexing)

**vite配置：**

vite.config.js === webpack.config.js

```js
export default {
  optimizeDeps:{
    exclude:["lodash-es"],//当遇到lodash-es这个依赖的时候不进行预构建
  }
}
```

重启服务后就会发现会发送很多的网络请求去加载依赖

![image-20221022155751428](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202210221557461.png!blog.guiyexing)
