import React, { useEffect } from 'react';

// 默认实现，你可以自定义
export default function Root({children}) {
  useEffect(()=>{
    // document.oncontextmenu = function(){
    //   console.log(111,'数据😎😎😎111');
    //   return false
    // }

  },[])
  return <>{children}</>;
}