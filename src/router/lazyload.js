import React from "react";
import Loadable from "react-loadable";

// 通用的懒加载
const loadingComponent = () => {
    return (
        <div>
            loading正在加载中......
        </div>
    )
}
export default (loader, loading = loadingComponent) => {
    return Loadable({
        loader,   //需要懒加载的组件
        loading  //加载效果样式
    })        
}