import React, {Component} from "react";
import {Card, Tag} from "antd";

export default class Tags extends Component {

    onClose(e){
        console.log(e)
    }

    render() {
        return (
            <Card title="标签管理" bordered={false} style={{height: "100%"}}>
                <Tag closable onClose={this.onClose}>123</Tag>
                <Tag closable onClose={this.onClose}>123122222222222222222222222222</Tag>
                <Tag closable onClose={this.onClose}>123</Tag>
            </Card>
        )
    }

}