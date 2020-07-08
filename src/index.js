import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import LazyLoad from "./router/lazyload";

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Router basename="">
                    <Switch>
                        <Route path="/" exact render={() => (<Redirect to="/index" />)} />
                        <Route path="/index" component={LazyLoad(()=>import("./views"))}></Route>
                        <Route component={()=><div>哦豁，404喽！</div>}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);