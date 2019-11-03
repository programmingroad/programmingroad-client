import React, {Component} from "react";

import {Layout} from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

const {Footer, Content, Sider} = Layout;

export default class Admin extends Component {

    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    {/*<Header></Header>*/}
                    <Content style={{backgroundColor: '#fff'}}>Content</Content>
                    <Footer style={{textAlign: 'center', color: '#ccc'}}>推荐使用谷歌浏览器，可以获取的更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}