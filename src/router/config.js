import LazyLoad from "./lazyload"; //react路由懒加载需要依赖第三方模块 `react-loadable`, LazyLoad是之前封装好的懒加载效果

// 路由配置
const routes=[
    {
        path:'/index',
        component: LazyLoad(()=>import("../views/index")),
        children:[
            {
                path:'/index/game',
                component: LazyLoad(()=>import("../views/game"))
            },
            {
                path:'/index/counter',
                component: LazyLoad(()=>import("../views/counter/counter"))
            }
        ]
    }
];
// 抛出路由配置表
export default routes;