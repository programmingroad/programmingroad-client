import React, {Component} from "react";
import {Card, Divider, Modal, Table} from "antd";
import {reqAdminArticleList, reqAdminDeleteArticle} from "../../../api";

const {Column} = Table;
const {confirm} = Modal;

export default class AdminArticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
            currPage: 1,
            total: 0
        }
    }

    // 获取文章
    getArticles = async (currPage) => {
        const data = await reqAdminArticleList(currPage);
        this.setState({
            data: data.body,
            total: data.page.totalCount
        })
    }
    // 删除文章
    deleteArticle = (id) => {
        confirm({
            title: '删除文章',
            onOk: async () => {
                await reqAdminDeleteArticle(id);
                this.getArticles(this.state.currPage);
            },
            onCancel() {
            },
        })
    }

    onChange = (pagination) => {
        const {current} = pagination;
        this.getArticles(current);
        this.setState({
            currPage: current
        })
    }

    // 页面render后获取文章
    componentDidMount() {
        this.getArticles(this.state.currPage);
    }

    render() {
        const {data, currPage, total} = this.state;
        return (
            <Card title={"文章管理"} style={{minHeight: "100%"}}>
                <Table
                    dataSource={data}
                    pagination={{
                        current: currPage,
                        total
                    }}
                    onChange={this.onChange}
                    tableLayout={"fixed"}
                >
                    <Column title="标题" dataIndex="title" key="title"/>
                    <Column title="创建时间" dataIndex="createTime" key="createTime"/>
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a onClick={() => this.deleteArticle(record.id)}>删除</a>
                                <Divider type="vertical"/>
                                <a>编辑</a>
                            </span>

                        )}
                    />
                </Table>
            </Card>
        )
    }
}