import React, {Component} from "react";
import {Button, Card, Input, Modal, Select, message} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'
import {reqAdminAddArticle, reqAdminAllTag} from "../../../api";


const {Option} = Select;

export default class AdminEdit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            content: "",
            visible: false,
            selectTagId: 0,
            tagList: []
        })
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

    componentDidMount() {
        this.getTagList();
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

    changeSelect = (key) => {
        this.setState({
            selectTagId: key
        })
    }

    save = () => {
        this.addArticle("NOT_RELEASE", "保存成功");
    }

    release = () => {
        this.addArticle("RELEASED", "发布成功")
    }

    addArticle = (released, tip) => {
        if (!this.state.selectTagId) {
            message.warn("请选择标签");
            return;
        }
        const {selectTagId, title, content} = this.state;
        const article = ({
            tagId: selectTagId,
            title,
            content,
            released
        });
        reqAdminAddArticle(article).then(
            () => {
                message.success(tip);
                this.setState({
                    title: "",
                    content: "",
                })
            }
        );
    }

    render() {
        const {content, title, tagList} = this.state;
        return (
            <Card title={"写博客"} style={{height: "100%"}} className={"admin-edit-ant-card"}>
                <div className={"admin-edit-header"}>
                    <Input placeholder={"请输入标题"} style={{marginRight: '30px'}} value={title}
                           onChange={this.changeTitle}/>
                    <Select defaultValue="请选择标签" style={{width: 180}} onChange={this.changeSelect}>
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