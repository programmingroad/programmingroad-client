import React, {Component} from "react";

import {Layout} from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home";
import Edit from "../edit";
import Tags from "../tags";
import Articles from "../articles";
import {Redirect, Route, Switch} from "react-router-dom";

const {Content, Sider} = Layout;

export default class Admin extends Component {

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Header></Header>
                <Layout>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Content>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/edit' component={Edit}/>
                            <Route path='/admin/tags' component={Tags}/>
                            <Route path='/admin/articles' component={Articles}/>
                            <Redirect to='/admin/home'/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}