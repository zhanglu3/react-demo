import React, { Fragment, useState } from "react";
import {
    Route,
    Link,
    Switch,
    Redirect,
    useParams,
    useRouteMatch,
    useHistory,
    useLocation,
} from "react-router-dom";

import LazyLoad from "../router/lazyload";

function Child(props) {
    console.log('ChildTest', props)
    let { page} = useParams();
    let num=props.match.params.num;
    return (
        <div>
            <h3>
                当前页: {page}--数字:{num}
            </h3>
        </div>
    );
}

export default function() {
    let { path, url } = useRouteMatch();
    let [isLogin, setIsLogin] = useState(false);
    let history = useHistory();

    const LoginBtn = () =>  <button onClick={()=>{setIsLogin(true); history.push(`${url}/protected`)}}>登录</button>
    const Login = () => <LoginBtn/>
    const LoginOutBtn = () => {
        return <button onClick={()=>{setIsLogin(false); history.push(`${url}/login`)}}>退出登录</button>
    }
    const Condition = ({ children }) => isLogin ? children : <Redirect to={`${url}/login`} />
    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route {...rest} render={() => <Condition children={children} />} />
        );
    }

    let [firstTest, setFirstTest] = useState(0);
    let location = useLocation();

    return (
        <Fragment>
            <div className="pg_index">
                <ul>
                    <li><Link to="/">Index</Link></li>
                    <li><Link to={`${url}/game`}>Game</Link></li>
                    <li><Link to={`${url}/counter`}>Counter</Link></li>
                    <li><Link to={`${url}/test1/number1`}>Test1-1</Link></li>
                    <li><Link to={`${url}/test2/number2`}>Test2-2</Link></li>
                    <li><Link to={`${url}/test3/number3`}>Test3-3</Link></li>
                    <li><Link to={`${url}/protected`}>Auth</Link></li>
                    <li>
                        <Link to={`${url}/1?testVal=${firstTest}`}
                              onClick={() => {
                                  console.log('Link 标签（跳转到/1）的 onClick 事件', location)
                              }}>
                            示例1
                        </Link>
                        <input type="text" value={firstTest} onChange={(e) => setFirstTest(e.target.value)}/>
                    </li>
                </ul>
                <Switch>
                    <Route exact path={`${path}/game`} component={LazyLoad(()=>import("./game"))}></Route>
                    <Route exact path={`${path}/counter`} component={LazyLoad(()=>import("./counter/counter"))}></Route>
                    <Route path={`${path}/:page/:num`} component={Child} />
                    <Route path={`${path}/login`} component={Login} />
                    <PrivateRoute path={`${path}/protected`}>
                        <h2>已经登录 可查看-protected</h2>
                        <LoginOutBtn/>
                    </PrivateRoute>
                    <Route path={`${path}/1`} component={(props) => (
                        <div>
                            第一个组件读取参数（location.search） {props.location.search}{console.log('示例1', props)}
                        </div>
                    )}/>
                </Switch>
            </div>
        </Fragment>
    )
}
