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
                            <Route exact path='/admin/home' component={Home}/>
                            <Route exact path='/admin/edit' component={Edit}/>
                            <Route exact path='/admin/tags' component={Tags}/>
                            <Route exact path='/admin/articles' component={Articles}/>
                            <Redirect to='/admin/home'/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}