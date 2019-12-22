import React, {Component} from "react";
import Header from "../../components/header";
import ReactMarkdown from "react-markdown";
import {reqArticle} from "../../api"

import './index.less'
import HeadingRenderer from "../../components/markdown/renderer/HeadingRenderer";
import MarkdownAnchor from "../../components/markdown/anchor";

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: undefined,
            content: undefined,
        })
        this.id = 0;
    }

    getArticle = () => {
        const id = this.props.match.params.id;
        reqArticle(id).then(
            data => {
                this.setState({
                    title: data.body.title,
                    content: data.body.content,
                })
            }
        );
    }

    componentDidMount() {
        this.getArticle();
    }

    headingRenderer = (props) => {
        return <HeadingRenderer {...props} id={this.id++}/>
    }

    render() {
        const {title, content} = this.state;
        return (
            <div className={"content-wrapper"}>
                <Header title={title}></Header>
                <div className={"content-body"}>
                    <div className={"content-body-center"}>
                        <div className={"content-body-center-markdown"}>
                            <ReactMarkdown source={content} renderers={{heading: this.headingRenderer}}/>
                        </div>
                        <div className={"content-body-center-anchor"}>
                            <MarkdownAnchor/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}