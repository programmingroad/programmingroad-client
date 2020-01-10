import React, {Component} from "react";
import {Button, List, Tabs} from "antd";
import Header from "../../components/header";

import './index.less'
import {reqAllTag, reqArticleList} from "../../api";
import {Link} from "react-router-dom";

const {TabPane} = Tabs;

export default class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            currPage: 1,
            totalPage: 0,
            selectTagId: 0,
            tagList: [],
            articleList: []
        })
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
        const data = await reqArticleList(page, tagId);
        this.setState({
            articleList: [...this.state.articleList, ...data.body],
            currPage: page,
            totalPage: data.page.totalPage
        })
    }

    onLoadMore = () => {
        this.getArticleList(this.state.currPage + 1, this.state.selectTagId)
    };

    onChange = (key) => {
        this.setState({
            currPage: 1,
            selectTagId: key,
            articleList: []
        }, () => {
            this.getArticleList(this.state.currPage, this.state.selectTagId)
        })
    }

    getLoadMore = () => {
        return this.state.currPage < this.state.totalPage ?
            (<div
                style={{
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 50,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>)
            :
            null;
    }

    render() {
        const {tagList, articleList} = this.state;
        return (
            <div className={"blog-wrapper"}>
                <Header title={"Blog"}></Header>
                <div className={"blog-content"}>
                    {
                        tagList.length > 0 ?
                            <Tabs style={{width: '50%'}} onChange={this.onChange}>
                                {
                                    tagList.map(item => (
                                            <TabPane tab={item.name} key={item.id}>
                                                <List
                                                    loadMore={this.getLoadMore()}
                                                    dataSource={articleList}
                                                    itemLayout="vertical"
                                                    renderItem={item => (
                                                        <List.Item
                                                            actions={[<Link to={"/content/" + item.id} target={'_blank'}>
                                                                readMore >>
                                                            </Link>]}
                                                        >
                                                            <List.Item.Meta
                                                                title={item.title}
                                                            />
                                                            <div>Article created by {item.createTime}</div>
                                                        </List.Item>
                                                    )}
                                                />
                                            </TabPane>
                                        )
                                    )
                                }
                            </Tabs>
                            : undefined
                    }
                </div>
                <div className={"blog-footer"}>
                    <a href={"http://www.beian.miit.gov.cn"} target={"_blank"}>京ICP备19053531号-1</a>
                </div>
            </div>
        )
    }
}