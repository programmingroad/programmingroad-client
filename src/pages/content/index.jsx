import React, {Component} from "react";
import Header from "../../components/header";
import ReactMarkdown from "react-markdown";
import {reqArticle} from "../../api"

import './index.less'

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            content: ""
        })
    }

    getArticle = () => {
        const id = this.props.match.params.id;
        reqArticle(id).then(
            data => {
                this.setState({
                    title: data.body.title,
                    content: data.body.content
                })
            }
        );
    }

    componentDidMount() {
        this.getArticle();
    }

    render() {
        const {title, content} = this.state;
        return (
            <div className={"content-wrapper"}>
                <Header title={title}></Header>
                <div className={"content-body"}>
                    <div className={"content-body-markdown"}>
                        <ReactMarkdown source={content}/>
                    </div>
                </div>
            </div>
        )
    }
}