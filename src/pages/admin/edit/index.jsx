import React, {Component} from "react";
import {Button, Card, Input, Modal, Select, message} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'
import {reqAdminAddArticle, reqAdminAllTag, reqAdminArticle, reqAdminUpdateArticle} from "../../../api";

const {Option} = Select;

export default class AdminEdit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            article: {},
            visible: false,
            tagList: [],
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        // 如果id存在 获取该文章的content,title,tagId
        if (id) {
            reqAdminArticle(id).then(data => {
                    this.setState({
                        article: data.body
                    })
                }
            );
        }
        this.getTagList();
    }

    getTagList = () => {
        reqAdminAllTag().then(
            data => {
                this.setState({
                    tagList: data.body
                })
            }
        );
    }

    preview = () => {
        this.setState({
            visible: true,
        });
    };

    cancelPreview = () => {
        this.setState({
            visible: false,
        });
    };

    changeContent = (e) => {
        this.setState({
            article: {
                ...this.state.article,
                content: e.target.value
            }
        })
    }

    changeTitle = (e) => {
        this.setState({
            article: {
                ...this.state.article,
                title: e.target.value
            }
        })
    }

    changeTag = (tagId) => {
        this.setState({
            article: {
                ...this.state.article,
                tagId
            }
        })
    }

    save = () => {
        // 必须要有标签id
        if (this.state.article.tagId) {
            // 判断是否有文章id 有id更新
            if (this.state.article.id) {
                reqAdminUpdateArticle(this.state.article.id, this.state.article).then(() => {
                    message.success("更新成功");
                    this.clearArticle();
                })
            } else {
                reqAdminAddArticle(this.state.article).then(() => {
                    message.success("保存成功");
                    this.clearArticle();
                })
            }
        } else {
            message.warn("请选择标签")
        }
    }

    release = () => {
        // 必须要有标签id
        if (this.state.article.tagId) {
            // 判断是否有文章id 有id更新
            if (this.state.article.id) {
                reqAdminUpdateArticle(this.state.article.id, {
                    ...this.state.article,
                    released: "RELEASED"
                }).then(() => {
                    message.success("发布成功");
                    this.clearArticle();
                })
            } else {
                reqAdminAddArticle({
                    ...this.state.article,
                    released: "RELEASED"
                }).then(() => {
                    message.success("发布成功");
                    this.clearArticle();
                })
            }
        } else {
            message.warn("请选择标签")
        }
    }

    clearArticle = () => {
        this.setState({
            article: {}
        })
    }

    render() {
        const {article, tagList} = this.state;
        console.log(article)
        return (
            <Card title={"写博客"} style={{height: "100%"}} className={"admin-edit-ant-card"}>
                <div className={"admin-edit-header"}>
                    <Input
                        placeholder={"请输入标题"}
                        style={{marginRight: '30px'}}
                        value={article.title ? article.title : ""}
                        onChange={this.changeTitle}
                    />
                    <Select
                        value={article.tagId ? article.tagId : "请选择标签"}
                        placeholder={"请选择标签"}
                        style={{width: 180}}
                        onChange={this.changeTag}
                    >
                        {
                            tagList.map(
                                item => {
                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                }
                            )
                        }
                    </Select>
                    <Button type="primary" style={{marginLeft: '30px'}} onClick={this.preview}>预览</Button>
                    <Modal
                        title="预览"
                        visible={this.state.visible}
                        onOk={this.cancelPreview}
                        onCancel={this.cancelPreview}
                        footer={null}
                        wrapClassName={'admin-edit-modal'}
                    >
                        <ReactMarkdown source={article.content ? article.content : ""}/>
                    </Modal>
                    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.save}>更新/保存</Button>
                    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.release}
                            disabled={article.released === "RELEASED"}>发布</Button>
                </div>
                <textarea
                    className={"admin-edit-content"}
                    onChange={this.changeContent}
                    value={article.content ? article.content : ""}
                >
                </textarea>
            </Card>
        )
    }
}