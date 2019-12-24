import React, {Component} from "react";
import {Card, Divider, Modal, Table, Tabs} from "antd";
import {reqAdminArticleList, reqAdminDeleteArticle, reqAllTag} from "../../../api";
import {Link} from "react-router-dom";

const {Column} = Table;
const {confirm} = Modal;
const {TabPane} = Tabs;

export default class AdminArticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            currPage: 1,
            totalCount: 0,
            selectTagId: 0,
            tagList: [],
            loading: true
        }
    }

    async componentDidMount() {
        let tagId = await this.getTagList();
        this.getArticleList(this.state.currPage, tagId)
    }

    getTagList = async () => {
        const data = await reqAllTag();
        const length = data.body.length;
        const firstTagId = length ? data.body[0].id : 0;
        this.setState({
            tagList: data.body,
            selectTagId: firstTagId
        })
        return firstTagId;
    }

    getArticleList = async (page, tagId) => {
        const data = await reqAdminArticleList(page, tagId, 'RELEASED');
        this.setState({
            articleList: data.body,
            currPage: data.page.currPage,
            totalPage: data.page.totalPage,
            loading: false
        })
    }

    // 删除文章
    deleteArticle = (id) => {
        confirm({
            title: '删除文章',
            onOk: () => {
                reqAdminDeleteArticle(id).then(
                    () => {
                        this.getArticleList(this.state.currPage, this.state.selectTagId);
                    }
                );
            },
            onCancel() {
            },
        })
    }

    tableOnChange = (pagination) => {
        const {current} = pagination;
        this.getArticleList(current, this.state.selectTagId);
    }

    tabsOnChange = (key) => {
        this.setState({
            currPage: 1,
            selectTagId: key,
            articleList: []
        }, () => {
            this.getArticleList(this.state.currPage, this.state.selectTagId)
        })
    }

    render() {
        const {articleList, currPage, totalCount, tagList, loading} = this.state;
        return (
            <Card title={"文章管理"} style={{minHeight: "100%"}}>
                {
                    tagList.length > 0 ?
                        <Tabs onChange={this.tabsOnChange}>
                            {
                                tagList.map(item => (
                                        <TabPane tab={item.name} key={item.id}>
                                            <Table
                                                dataSource={articleList}
                                                pagination={{
                                                    current: currPage,
                                                    total: totalCount
                                                }}
                                                onChange={this.tableOnChange}
                                                tableLayout={"fixed"}
                                                rowKey={(record) => {
                                                    return record.id
                                                }}
                                                loading={loading}
                                            >
                                                <Column title="标题" dataIndex="title" key="title"/>
                                                <Column title="创建时间" dataIndex="createTime" key="createTime"/>
                                                <Column
                                                    title="操作"
                                                    key="action"
                                                    render={(text, record) => (
                                                        <span>
                                                                <Link to={"#"}
                                                                      onClick={() => this.deleteArticle(record.id)}>删除</Link>
                                                                <Divider type="vertical"/>
                                                                <Link to={"#"}>编辑</Link>
                                                            </span>
                                                    )}
                                                />
                                            </Table>
                                        </TabPane>
                                    )
                                )
                            }
                        </Tabs>
                        : undefined
                }
            </Card>
        )
    }
}