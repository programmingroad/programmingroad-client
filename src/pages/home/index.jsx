import React, {Component} from "react";
import {Layout} from "antd";
import HomeBlog from "./blog";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeHeader from "../../components/home/header";

const {Content} = Layout;


export default class Home extends Component {
    render() {
        return (
            <Layout>
                <HomeHeader></HomeHeader>
                <Content>
                    <Switch>
                        <Route exact path='/blog' component={HomeBlog}/>
                        <Redirect to='/blog'/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}