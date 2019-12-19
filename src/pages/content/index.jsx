import React, {Component} from "react";
import Header from "../../components/header";
import ReactMarkdown from "react-markdown";
import {reqArticle} from "../../api"

import './index.less'
import HeadingRenderer from "../../components/markdown/renderer/HeadingRenderer";

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
        const headingRenderer = (props) =>
            <HeadingRenderer {...props} description={"123"}/>
        return (
            <div className={"content-wrapper"}>
                <Header title={title}></Header>
                <div className={"content-body"}>
                    <div className={"content-body-markdown"}>
                        <ReactMarkdown source={content} renderers={{heading: headingRenderer}}/>
                    </div>
                </div>
            </div>
        )
    }
}