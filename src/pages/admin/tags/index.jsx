import React, {Component} from "react";
import {Button, Card, Input, Modal, Table} from "antd";
import {reqAdminAddTag, reqAdminAllTag, reqAdminDeleteTag} from "../../../api";

import './index.less'


const {Column} = Table;
const {confirm} = Modal;

export default class AdminTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            data: [],
            visible: false
        }
    }

    // 获取标签
    getTags = async () => {
        const data = await reqAdminAllTag();
        this.setState({
            data: data.body
        })
    }

    // 删除标签
    deleteTag = (id) => {
        confirm({
            title: '删除标签',
            onOk: async () => {
                await reqAdminDeleteTag(id);
                this.getTags();
            },
            onCancel() {
            },
        })
    }

    // 点击确认
    onOk = async () => {
        const {inputValue} = this.state;
        await reqAdminAddTag(inputValue);
        this.getTags();
        this.setState({
            visible: false,
            inputValue: ''
        });
    };

    // 显示添加标签的modal
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 隐藏添加标签的modal
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    // 改变inputValue
    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    // 页面render后获取全部的标签
    componentDidMount() {
        this.getTags();
    }

    render() {
        const {data, inputValue} = this.state;
        return (
            <Card title={"标签管理"} style={{minHeight: "100%"}}>
                <div className={'admin-tag-header'}>
                    <Button type="primary" style={{marginLeft: '30px'}} onClick={this.showModal}>添加标签</Button>
                    <Modal
                        title="添加标签"
                        visible={this.state.visible}
                        onOk={this.onOk}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Input placeholder="标签名称" onChange={this.onChange} value={inputValue}/>
                    </Modal>
                </div>
                <Table dataSource={data} pagination={false} tableLayout={"fixed"}>
                    <Column title="名称" dataIndex="name" key="name"/>
                    <Column title="创建时间" dataIndex="createTime" key="createTime"/>
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <a onClick={() => this.deleteTag(record.id)}>删除</a>
                        )}
                    />
                </Table>
            </Card>
        )
    }
}