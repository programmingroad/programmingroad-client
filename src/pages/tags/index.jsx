import React, {Component} from "react";
import {Card, Modal, Table} from "antd";


const {Column} = Table;
const {confirm} = Modal;

export default class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "id": 4,
                    "name": "java"
                },
                {
                    "id": 5,
                    "name": "spring boot"
                },
                {
                    "id": 6,
                    "name": "react"
                }
            ]
        }
    }

    deleteTag = (id) => {
        confirm({
            title: '删除标签?',
            onOk: () => {
                this.setState({
                    data: this.state.data.filter(item => item.id !== id)
                })
            },
            onCancel() {
            },
        })
    }

    render() {

        const {data} = this.state;

        return (
            <Card title={"标签管理"} style={{minHeight: "100%"}}>
                <Table dataSource={data} pagination={false}>
                    <Column title="名称" dataIndex="name" key="name"/>
                    <Column
                        title="操作"
                        key="action"
                        width={"300px"}
                        render={(text, record) => (
                            <a onClick={() => this.deleteTag(record.id)}>删除</a>
                        )}
                    />
                </Table>
            </Card>
        )
    }

}