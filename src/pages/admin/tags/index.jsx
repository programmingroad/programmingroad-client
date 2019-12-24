import React, {Component} from "react";
import {Card, Icon, Input, Modal, Table} from "antd";
import {reqAdminAddTag, reqAdminAllTag, reqAdminDeleteTag} from "../../../api";

import './index.less'
import {Link} from "react-router-dom";


const {Column} = Table;
const {confirm} = Modal;

export default class AdminTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            data: [],
            visible: false,
            loading: true
        }
    }

    // 获取标签
    getTags = () => {
        reqAdminAllTag().then(
            data => {
                this.setState({
                    data: data.body,
                    loading: false
                })
            }
        );
    }

    // 删除标签
    deleteTag = (id) => {
        confirm({
            title: '删除标签',
            onOk: () => {
                reqAdminDeleteTag(id).then(
                    () => {
                        this.getTags();
                    }
                );
            },
            onCancel() {
            },
        })
    }

    // 点击确认
    onOk = () => {
        const {inputValue} = this.state;
        reqAdminAddTag(inputValue).then(
            () => {
                this.getTags();
                this.setState({
                    visible: false,
                    inputValue: ''
                });
            }
        );
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
        const {data, inputValue, visible, loading} = this.state;
        return (
            <Card title={"标签管理"} style={{minHeight: "100%"}}>
                <Table
                    dataSource={data}
                    pagination={false}
                    tableLayout={"fixed"}
                    rowKey={(record) => {
                        return record.id
                    }}
                    loading={loading}
                >
                    <Column title="名称" dataIndex="name" key="name"/>
                    <Column title="创建时间" dataIndex="createTime" key="createTime"/>
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Link to="#" onClick={() => this.deleteTag(record.id)}>删除</Link>
                        )}
                    />
                </Table>
                <Link to={"#"} className={'admin-tag-add'} onClick={this.showModal}>
                    <Icon type="plus" style={{fontSize: '30px'}}/>
                </Link>
                <Modal
                    title="添加标签"
                    visible={visible}
                    onOk={this.onOk}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Input placeholder="标签名称" onChange={this.onChange} value={inputValue}/>
                </Modal>
            </Card>
        )
    }
}