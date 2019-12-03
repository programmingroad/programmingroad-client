import React, {Component} from "react";
import Header from "../../components/header";
import ReactMarkdown from "react-markdown";

import './index.less'

export default class Content extends Component {

    render() {
        return (
            <div className={"detail-wrapper"}>
                <Header title={this.props.title}></Header>
                <div className={"detail-content"}>
                    <ReactMarkdown source={this.props.content} style={{width: '50%'}}/>
                </div>
            </div>
        )
    }
}