import React, {Component} from "react";
import {Button, Card, Dropdown, Icon, Input, Menu} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'

const menu = (
    <Menu>
        <Menu.Item key="1">
            1st menu item
        </Menu.Item>
        <Menu.Item key="2">
            2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
            3rd item
        </Menu.Item>
    </Menu>
);

const {TextArea} = Input;

export default class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            value: ""
        })
    }

    onChange = (e) => {
        if("0"){
            console.log(0)
        }

        if("1"){
            console.log(1)
        }
        // console.log(e)
        // this.setState({
        //     value: e.target.value
        // })
    }

    render() {

        const {value} = this.state;
        return (
            <Card title={"写博客"} style={{height: "100%"}}>
                <div className={"edit-header"}>
                    <Input placeholder={"请输入标题"} style={{marginRight: '30px'}}/>
                    <Dropdown overlay={menu}>
                        <Button>
                            请选择标签 <Icon type="down"/>
                        </Button>
                    </Dropdown>
                    <Button type="primary" style={{marginLeft: '30px'}}>发布</Button>
                    <Button type="primary" style={{marginLeft: '10px'}}>保存</Button>
                </div>
                <div className={"edit-content"}>
                    <textarea
                        className={"edit-content-left"}
                        onChange={this.onChange}
                        value={value}
                        contentEditable={true}
                    >
                    </textarea>
                    <ReactMarkdown className={"edit-content-right"} source={value}/>
                </div>
            </Card>
        )
    }
}