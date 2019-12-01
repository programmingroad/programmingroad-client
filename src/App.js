import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./pages/login";
import Admin from "./pages/admin";
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import CallBack from "./pages/github";
import {Provider} from "react-redux";
import store from "./store";
import Home from "./pages/home";

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
                            <Route path='/' component={Home}/>
                        </Switch>
                    </BrowserRouter>
                </ConfigProvider>
            </Provider>
        );
    }
}

export default App;
