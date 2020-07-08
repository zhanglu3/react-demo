import React, { Fragment } from "react";
import {
    Route,
    Link,
    Switch,
    Redirect,
    useParams,
    useRouteMatch,
    useHistory,
} from "react-router-dom";

import LazyLoad from "../router/lazyload";

function Child(props) {
    console.log(props)
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
    let isLogin = true;
    let history = useHistory();

    const LoginBtn = () =>  <button onClick={()=>{isLogin = true;history.push(`${url}/protected`)}}>登录</button>

    const LoginOutBtn = () => {
    return <button onClick={()=>{isLogin = false;history.push(`${url}/login`)}}>退出登录</button>
    }

    const Login = () => <LoginBtn/>

    const Condition = ({ children }) => isLogin ? children : <Redirect to={`${url}/login`} />

    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route {...rest} render={() => <Condition children={children} />} />
        );
    }

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
                    <li><Link to={`${url}/protected`}>protected</Link></li>
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
                </Switch>
            </div>
        </Fragment>
    )
}
