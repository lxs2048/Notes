# vite启动项目初体验

开箱即用(out of box):

你不需要做任何额外的配置就可以使用vite来帮你处理构建工作

创建test-vite目录进行体验：

```
test-vite
├── index.html
├── counter.js
└── main.js
```

```js title="counter.js"
export const count = 0
```

```js title="main.js"
import {count} from './counter'
console.log(count)
```

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./main.js" type="module"></script>
</body>
</html>
```

直接启动项目是无法打印count的，无法找到`/counter`，导入counter必须加上`.js`后缀。

接下来测试lodash包

```
git init
npm init -y
npm i lodash
```

然后我们在`counter.js`中导入lodash

```js
import _ from 'lodash'
console.log(_)
```

发生如下错误：

Uncaught TypeError: Failed to resolve module specifier "lodash". Relative references must start with either "/", "./", or "../".

在默认情况下, 我们的esmodule去导入资源的时候, 要么是绝对路径, 要么是相对路径

既然我们现在的最佳实践就是node_modules, 那为什么es官方在我们导入非绝对路径和非相对路径的资源的时候不默认帮我们搜寻node_modules呢？

假设浏览器做了这个事情，就会造成**依赖嵌套，消耗网络资源**

现在的问题是loadsh无法加载出来

接下来我们安装vite来处理代码

```
npm i vite -D
```

```json title="package.json"
"scripts": {
    "dev": "vite"
},
```

使用`npm run dev`启动项目，直接就可以看到打印的lodash了，这就是vite的开箱即用