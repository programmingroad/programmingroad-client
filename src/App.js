import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Login from "./pages/login";
import Admin from "./pages/admin";
import Blog from "./pages/blog";
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';

class App extends Component {

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route path='/admin' component={Admin}/>
                        <Route exact path='/' component={Blog}/>
                        <Redirect to='/'/>
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}

export default App;
