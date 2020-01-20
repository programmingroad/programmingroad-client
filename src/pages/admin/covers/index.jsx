import React, {Component} from "react";
import {Card, Icon, message, Modal, Upload} from "antd";
import {reqAdminCoverDelete, reqAdminCoverList} from "../../../api";

const {confirm} = Modal;

export default class AdminCovers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    }

    componentDidMount() {
        this.getCoverList();
    }

    getCoverList = () => {
        reqAdminCoverList().then(data => {
                this.setState({
                    fileList: data.body
                })
            }
        );
    }

    handleCancel = () => {
        this.setState({previewVisible: false});
    }

    handlePreview = async file => {
        this.setState({
            previewImage: file.url,
            previewVisible: true,
        });
    };

    handleChange = (info) => {
        const {fileList} = info;
        switch (info.file.status) {
            case 'removed':
                confirm({
                    title: '删除封面图片',
                    onOk: () => {
                        reqAdminCoverDelete(info.file.id).then(
                            () => {
                                this.setState({fileList})
                                message.success("删除成功");
                            }
                        );
                    },
                    onCancel() {
                    },
                })
                break;
            case 'done':
                this.setState({fileList})
                message.success("上传成功");
                break;
            case 'error':
                message.success("上传失败");
                break;
            default:
                this.setState({fileList})
        }
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Card title={"封面管理"} style={{minHeight: "100%"}}>
                <Upload
                    action={"/api/admin/image/cover/upload"}
                    name={"multipartFile"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </Card>
        )
    }
}