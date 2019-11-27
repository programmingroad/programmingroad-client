import React, {Component} from "react";
import {Button, Card, Dropdown, Icon, Input, Menu, Modal} from "antd";
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

export default class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            value: "",
            visible: false
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        console.log(e)
        this.setState({
            value: e.target.value
        })
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
                    <Button type="primary" style={{marginLeft: '30px'}} onClick={this.showModal}>预览</Button>
                    <Modal
                        title="预览"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        footer={null}
                        wrapClassName={'edit-modal'}
                    >
                        <ReactMarkdown className={''} source={value}/>
                    </Modal>
                    <Button type="primary" style={{marginLeft: '10px'}}>保存</Button>
                    <Button type="primary" style={{marginLeft: '10px'}}>发布</Button>
                </div>
                <textarea
                    className={"edit-content"}
                    onChange={this.onChange}
                    value={value}
                >
                </textarea>
            </Card>
        )
    }
}