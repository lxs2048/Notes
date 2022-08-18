---
slug: react-dnd
title: react-dnd实践
authors: [dolphin]
tags: [拖拽, 拖放, react-dnd]

---

公司使用react-dnd作为项目拖拽库，一时兴起做个简单的拖拽demo

<!--truncate-->

基础代码如下

```js
import { useState } from "react";
import styled from 'styled-components'
const MyDnd = () => {
  return (
    <div className="any-container">
        <DndApp />
    </div>
  );
};
export default MyDnd;

const DndApp = () => {
  let [source, setSoutce] = useState([
    { id: 1, text: "text1" },
    { id: 2, text: "text2" },
    { id: 3, text: "text3" },
    { id: 4, text: "text4" }
  ]);
  return (
    <div>
      {source.map((item,index) => {
        return <Card key={item.id} source={item} index={index} />;
      })}
    </div>
  );
};

const Card = (props) => {
  const { source,index } = props;
  return <CatdItem>{source.text}</CatdItem>;
};

const CatdItem = styled.div`
  background-color: coral;
  color:#fff;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
  cursor: move;
`;
```

![image-20220730215212530](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202208181623976.png!blog.guiyexing)

一、DndProvider

使用DndProvider组件包裹我们的组件

```js
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const MyDnd = () => {
  return (
    <div className="any-container">
      <DndProvider backend={HTML5Backend}>
        <DndApp />
      </DndProvider>
    </div>
  );
};
```

DndProvider组件为应用程序提供React Dnd的功能，使用时**必须**通过backend属性注入一个后端

**后端抽象出浏览器差异并处理原生DOM事件,并将DOM事件转换为React DnD 可以处理的内部Redux操作**

`react-dnd-html5-backend`使用HTML5拖放API，不支持触摸事件，不适用移动设备，可使用`react-dnd-touch-backend`

二、useDrag

拖拽分两步拖动和放置

* 当我们在屏幕上拖动某物的时候，并不是在拖一个DOM节点，而是说某种类型(type)的项目(item)
* 这个项目就是一个js对象，用来描述被拖动的内容
* 每个项目都会有一个type类型，类型可以是字符串或者是Symbol,可以唯一的标识某个项目的类型
* 拖放源很多，放置目标也很多，只有type相同时才能将拖放源放置到对应的accept目标

useDrag对应的项目拖动源DragSource

使用useDrag拖动项目

```js
import { DndProvider, useDrag } from "react-dnd";
const Card = (props) => {
  const { source, index } = props;
  const dragRef = useRef();
  // useDrag hook提供一种将组件作为拖拽源连接到React Dnd系统的方法
  // DragSource Ref 拖动源的连接器，连接真实DOM和React Dnd系统
  let [collectedProps, drag] = useDrag({
    type: "custom-card",
    // item:用于描述拖动源的普通JS对象
    item: () => ({ ...source, index }),
    // collect:收集属性,返回一个JS对象，返回的值会合并到组件属性中
    // monitor里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并进行刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging() //项目是否正在被拖拽的状态
    })
  });
  drag(dragRef);
  return (
    <CatdItem isDragging={collectedProps.isDragging} ref={dragRef}>
     {source.text}
    </CatdItem>
  );
};

const CatdItem = styled.div`
  background-color: coral;
  color: #fff;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
  cursor: move;
  opacity: ${(props) => (props.isDragging ? 0.1 : 1)};
`;
```

拖动项目后原项目的透明度变成0.1但是还不能放到某位置进行交互

三、useDrop

useDrop对应的项目叫放置目标DropTarget

```js
import { DndProvider, useDrag, useDrop } from "react-dnd";
const DndApp = () => {
  let [source, setSoutce] = useState([
    { id: 1, text: "text1" },
    { id: 2, text: "text2" },
    { id: 3, text: "text3" },
    { id: 4, text: "text4" }
  ]);
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = source[dragIndex];
    let cloneSouce = [...source];
    cloneSouce.splice(dragIndex, 1);
    cloneSouce.splice(hoverIndex, 0, dragCard);
    setSoutce(cloneSouce);
  };
  return (
    <div>
      {source.map((item, index) => {
        return (
          <Card key={item.id} source={item} index={index} moveCard={moveCard} />
        );
      })}
    </div>
  );
};
const Card = (props) => {
  const { source, index, moveCard } = props;
  const dragRef = useRef();
  let [, drop] = useDrop({
    // 一个字符串，这个放置目标只会对指定类型的拖动源发生反映
    accept: "custom-card",
    collect: () => ({}),
    // 其他拖动源拖动到该项目上触发hover事件，item是拖动源的item返回的内容
    hover(item, monitor) {
      const dragIndex = item.index; //拖动的卡片的索引
      const hoverIndex = index; //当前hover的索引
      if (dragIndex === hoverIndex) return; //当前项目hover到当前项目
      const { top, bottom } = dragRef.current.getBoundingClientRect();
      const halfOfHoverHeight = (bottom - top) / 2; //当前项目高度的一半值
      const { y } = monitor.getClientOffset(); //event.clientY,当前鼠标的纵坐标
      const isUpOfHalfArea = y - top < halfOfHoverHeight; //拖拽到中心线的上方
      if (
        (dragIndex < hoverIndex && !isUpOfHalfArea) ||
        (dragIndex > hoverIndex && isUpOfHalfArea)
      ) {
        moveCard(dragIndex, hoverIndex);//更新数据
        item.index = hoverIndex;//替换当前拖动元素的index
      }
    }
  });
  // useDrag hook提供一种将组件作为拖拽源连接到React Dnd系统的方法
  // DragSource Ref 拖动源的连接器，连接真实DOM和React Dnd系统
  let [collectedProps, drag] = useDrag({
    type: "custom-card",
    // item:用于描述拖动源的普通JS对象
    item: () => ({ ...source, index }),
    // collect:收集属性,返回一个JS对象，返回的值会合并到组件属性中
    // monitor里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并进行刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging() //项目是否正在被拖拽的状态
    })
  });
  drag(dragRef);
  drop(dragRef);
  return (
    <CatdItem isDragging={collectedProps.isDragging} ref={dragRef}>
      {source.text}
    </CatdItem>
  );
};
```

最终效果如下：

![2022_07_30_21_57_36_90](https://blog-guiyexing.oss-cn-qingdao.aliyuncs.com/blogImg/202208181623982.gif)
