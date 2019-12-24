import React, {Component} from "react";
import {Button, Card, Input, Modal, Select, message} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'
import {
    reqAdminAllTag,
    reqAdminArticle,
    reqAdminReleaseArticle,
    reqAdminSaveArticle,
    reqAdminUpdateArticle
} from "../../../api";

const {Option} = Select;

export default class AdminEdit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            content: "",
            visible: false,
            selectTagId: 0,
            tagList: [],
            operateFinish: false
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        // 如果id存在 获取该文章的content,title,tagId
        if (id) {
            reqAdminArticle(id).then(data => {
                    this.setState({
                        title: data.body.title,
                        content: data.body.content,
                        selectTagId: data.body.tagId,
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
        if (this.props.match.params.id) {
            reqAdminUpdateArticle(this.props.match.params.id, {
                tagId: this.state.selectTagId,
                title: this.state.title,
                content: e.target.value
            });
        }
        this.setState({
            content: e.target.value
        })
    }

    changeTitle = (e) => {
        if (this.props.match.params.id) {
            reqAdminUpdateArticle(this.props.match.params.id, {
                tagId: this.state.selectTagId,
                title: e.target.value,
                content: this.state.content
            });
        }
        this.setState({
            title: e.target.value
        })
    }

    changeTag = (key) => {
        if (this.state.selectTagId === 0) {
            reqAdminSaveArticle({
                tagId: key,
                title: this.state.title,
                content: this.state.content,
            }).then(data => {
                this.props.history.replace("/admin/edit/" + data.body.id);
            })
        } else {
            reqAdminUpdateArticle(this.props.match.params.id, {
                tagId: key,
                title: this.state.title,
                content: this.state.content
            });
        }
        this.setState({
            selectTagId: key
        })
    }

    release = () => {
        if (this.props.match.params.id) {
            reqAdminReleaseArticle(this.props.match.params.id).then(
                () => {
                    message.success("发布成功");
                    this.setState({
                        title: "",
                        content: "",
                    })
                }
            );
        }
    }

    render() {
        const {content, title, tagList, selectTagId,operateFinish} = this.state;
        return (
            <Card title={"写博客"} style={{height: "100%"}} className={"admin-edit-ant-card"}>
                <div className={"admin-edit-header"}>
                    <Input
                        placeholder={"请输入标题"}
                        style={{marginRight: '30px'}}
                        value={title}
                        onChange={this.changeTitle}
                    />
                    <Select
                        defaultValue={selectTagId ? selectTagId : "请选择标签"}
                        style={{width: 180}}
                        onChange={this.changeTag}
                    >
                        {
                            tagList.map(
                                item => {
                                    return <Option key={item.id}>{item.name}</Option>
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
                        <ReactMarkdown source={content}/>
                    </Modal>
                    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.release}>发布</Button>
                </div>
                <textarea
                    className={"admin-edit-content"}
                    onChange={this.changeContent}
                    value={content}
                >
                </textarea>
            </Card>
        )
    }
}