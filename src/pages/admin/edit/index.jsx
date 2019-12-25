import React, {Component} from "react";
import {Button, Card, Input, Modal, Select, message} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'
import {reqAdminAddArticle, reqAdminAllTag, reqAdminArticle} from "../../../api";

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
        this.setState({
            content: e.target.value
        })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    changeTag = (key) => {
        this.setState({
            selectTagId: key
        })
    }

    save = () => {
        this.addArticle("NOT_RELEASE");
    }

    release = () => {
        this.addArticle("RELEASED");
    }

    addArticle = (released) => {
        if (this.state.selectTagId) {
            reqAdminAddArticle({
                tagId: this.state.selectTagId,
                title: this.state.title,
                content: this.state.content,
                released
            }).then(() => {
                message.success(released === "RELEASED" ? "发布成功" : "保存成功");
                this.setState({
                    title: "",
                    content: "",
                    selectTagId: 0,
                })
            })
        } else {
            message.warn("请选择标签")
        }
    }

    render() {
        const {content, title, tagList, selectTagId} = this.state;
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
                        value={selectTagId ? selectTagId : "请选择标签"}
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
                        <ReactMarkdown source={content}/>
                    </Modal>
                    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.save}>保存</Button>
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