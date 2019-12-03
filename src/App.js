import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Login from "./pages/login";
import Admin from "./pages/admin";
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import CallBack from "./pages/github";
import {Provider} from "react-redux";
import store from "./store";
import Blog from "./pages/blog";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <ConfigProvider locale={zhCN}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/callback' component={CallBack}/>
                            <Route path='/admin' component={Admin}/>
                            <Route exact path='/' component={Blog}/>
                            <Redirect to={"/"}/>
                        </Switch>
                    </BrowserRouter>
                </ConfigProvider>
            </Provider>
        );
    }
}

export default App;
