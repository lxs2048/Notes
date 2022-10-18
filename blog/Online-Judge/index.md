---
slug: online-Judge
title: ACM模式使用JS
authors: [dolphin]
tags: [OJ,Online Judge]
date: 2022-10-18T20:49
---

## ACM模式输入输出

在机试时往往都需要用ACM模式，也就是需要自己处理输入和输出（注意：力扣为核心模式）。Javascript主要有`Javascript(V8)`和`Javascript(Node)`两种

[OJ在线编程常见输入输出练习场](https://ac.nowcoder.com/acm/contest/5657)

## v8输入输出

第四题为例[A+B(4)](https://ac.nowcoder.com/acm/contest/5657/D)

对于针对单行输入，我们直接用`let line = readline();`即可。

在`Javascript(V8)`下可以直接使用`readline`，并且通过`print`来输出结果

```js
while(line = readline()){
    if(line === '0') break
    const lines = line.split(' ').map(Number)
    let ret = 0
    for(let i=1;i<lines.length;i++){
        ret += lines[i]
    }
    print(ret)
}
```

## node输入输出

还是以第四题为例[A+B(4)](https://ac.nowcoder.com/acm/contest/5657/D)

在`Javascript(node)`下可以需要导入`readline`包，通过固定的方法编写代码，通过`console.log`来输出结果

```js
const readline = require('readline')
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
rl.on('line',(line)=>{
    if(line === '0'){
        rl.close()
    }else{
        const lines = line.split(' ').map(Number)
        let res = 0
        for(let i=1;i<lines.length;i++){
            res += lines[i]
        }
        console.log(res)
    }
})
```

通用模板

```js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const inputArr = [];//存放输入的数据
rl.on('line', function(line){
  //line是输入的每一行，为字符串格式
    inputArr.push(line.split(' '));//将输入流保存到inputArr中（注意为字符串数组）
}).on('close', function(){
    console.log(fun(inputArr))//调用函数并输出
})

//解决函数
function fun() {
	xxxxxxxx
	return xx
}
```

## 练习

- [ A+B(1)](https://ac.nowcoder.com/acm/contest/5657/A)

  ```js
  while (line = readline()) {
      const [x,y]=line.split(" ").map(Number)
      print(x+y)
  }
  ```

- [A+B(2)](https://ac.nowcoder.com/acm/contest/5657/B)

  ```js
  let num = 0
  while(line = readline()){
      if(num === 0){
          num = line
      }else{
          const [x,y]=line.split(" ").map(Number)
          print(x+y)
      }
  }
  ```

- [A+B(3)](https://ac.nowcoder.com/acm/contest/5657/C)

  ```js
  while(line = readline()){
      if(line === '0 0'){
          break
      }else{
          const [x,y]=line.split(" ").map(Number)
          print(x+y)
      }
  }
  ```

- [A+B(4)](https://ac.nowcoder.com/acm/contest/5657/D)

  ```js
  while(line = readline()){
      if(line === '0') break
      const lines = line.split(' ').map(Number)
      let ret = 0
      for(let i=1;i<lines.length;i++){
          ret += lines[i]
      }
      print(ret)
  }
  ```

- [A+B(5)](https://ac.nowcoder.com/acm/contest/5657/E)

  ```js
  let row = 0
  while(line=readline()){
      const rowData = line.split(' ').map(Number)
      if(rowData.length === 1){
          row = rowData[0]
      }else{
          let ret = 0
          for(let i=1;i<rowData.length;i++){
              ret += rowData[i]
          }
          print(ret)
      }
  }
  ```

- [A+B(6)](https://ac.nowcoder.com/acm/contest/5657/F)

  ```js
  while(line=readline()){
      const rowData = line.split(' ').map(Number)
      let ret = 0
      for(let i=1;i<rowData.length;i++){
          ret += rowData[i]
      }
      print(ret)
  }
  ```

- [A+B(7)](https://ac.nowcoder.com/acm/contest/5657/G)

  ```js
  while(line=readline()){
      const lines = line.split(' ').map(Number)
      let ret = lines.reduce((pre,cur)=>{
         return pre+cur
      },0)
      print(ret)
  }
  ```

- [字符串排序(1)](https://ac.nowcoder.com/acm/contest/5657/H)

- [字符串排序(2)](https://ac.nowcoder.com/acm/contest/5657/I)

- [字符串排序(3)](https://ac.nowcoder.com/acm/contest/5657/J)