import React, {Component} from "react";
import {Layout} from "antd";

const {Header, Content} = Layout;


export default class HomeBlog extends Component {
    render() {
        return (
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
            </Layout>
        )
    }
}