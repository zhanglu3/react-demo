// 配置所有路由
import React, { Component, Fragment } from "react";

import {
    Redirect,   //路由重定向
    Route,  //定义路由选项,`负责接收对应的路由组件视图,充当路由插槽的作用
    Switch  //仅仅只会渲染一个路径,解决route的唯一渲染（仅仅渲染一个路由路径）
} from "react-router-dom";

import routes from "./config";

export default class MainRouter extends Component {
    render() {
        const data = routes.map((item,index)=>{
            // 路由对象   加载路由视图组件
            return <Route key={index} path={item.path} render={(routeProps)=>{  // routeProps 路由元信息
                // 判断当前得路由对象是否存在子路由
                if(item.children){   // 存在路由嵌套    递归函数
                    return <item.component {...routeProps} routes={item.children}/> 
                }else{    // 不存在路由嵌套
                    return <item.component {...routeProps}/>
                }
            }}/>
        });
        return (
            <Fragment>
                <Switch>
                    <Route path="/" exact render={() => (<Redirect to="/index" />)} />
                    {/* <Route path="/guide" component={LazyLoad(()=>import("./guide"))}></Route> */}
                    {data}
                    {/* 不存在 */}
                    {/* <Route render={() => (<Redirect to="/index" />)}></Route> */}
                    <Route component={()=><div>哦豁，404喽！</div>}/>
                </Switch>
            </Fragment>
        )
    }
}