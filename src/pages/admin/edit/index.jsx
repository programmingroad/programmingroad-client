import React, {Component} from "react";
import {Button, Card, Icon, Input, message, Modal, Select, Upload} from "antd";
import ReactMarkdown from "react-markdown";

import './index.less'
import {reqAdminAddArticle, reqAdminAllTag, reqAdminArticle, reqAdminUpdateArticle} from "../../../api";
import TextArea from "antd/es/input/TextArea";

const {Option} = Select;

export default class AdminEdit extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            article: {},
            visible: false,
            tagList: [],
        })
        this.myRef = React.createRef();
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

    changeDescription = (e) => {
        this.setState({
            article: {
                ...this.state.article,
                description: e.target.value
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
            const article = {
                ...this.state.article,
                released: "RELEASED"
            }
            if (this.state.article.id) {
                reqAdminUpdateArticle(this.state.article.id, article).then(() => {
                    message.success("发布成功");
                    this.clearArticle();
                })
            } else {
                reqAdminAddArticle(article).then(() => {
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

    uploadOnChange = (info) => {
        if (info.file.status === 'done') {
            const textarea = this.myRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const beforeValue = textarea.value.substring(0, startPos);
            const afterValue = textarea.value.substring(endPos, textarea.value.length);
            const text = "![](" + info.file.response.body.url + ")";
            this.setState({
                article: {
                    ...this.state.article,
                    content: beforeValue + text + afterValue
                }
            })
            textarea.selectionStart = startPos + text.length;
            textarea.selectionEnd = startPos + text.length;
            textarea.focus();
            message.success("上传成功");
        } else if (info.file.status === 'error') {
            message.error("上传失败");
        }
    }

    render() {
        const {article, tagList} = this.state;
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
                <TextArea
                    className={"admin-edit-description"}
                    placeholder={"请输入描述"}
                    rows={"3"}
                    onChange={this.changeDescription}
                    value={article.description ? article.description : ""}
                >
                </TextArea>
                <div className={"admin-edit-toolbar"}>
                    <Upload
                        action={"/api/admin/image/upload"}
                        name={"multipartFile"}
                        onChange={this.uploadOnChange}
                        showUploadList={false}
                    >
                        <Icon type="file-image" style={{fontSize: 20, cursor: "pointer"}}/>
                    </Upload>
                </div>
                <textarea
                    className={"admin-edit-content"}
                    onChange={this.changeContent}
                    value={article.content ? article.content : ""}
                    ref={this.myRef}
                >
                </textarea>
            </Card>
        )
    }
}