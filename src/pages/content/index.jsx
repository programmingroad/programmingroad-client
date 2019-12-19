import React, {Component} from "react";
import Header from "../../components/header";
import ReactMarkdown from "react-markdown";
import {reqArticle} from "../../api"

import './index.less'
import HeadingRenderer from "../../components/markdown/renderer/HeadingRenderer";
import {Anchor} from "antd";

const {Link} = Anchor;

export default class Content extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            content: "",
            anchors: []
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

    setAnchor = (id, title) => {
        console.log("id: " + id)
        console.log("title: " + title)
        this.setState({
            anchors: [{id, title}]
        })
    }

    componentDidMount() {
        this.getArticle();
    }

    render() {
        const {title, content, anchors} = this.state;
        const headingRenderer = (props) =>
            <HeadingRenderer {...props} setAnchor={this.setAnchor}/>
        return (
            <div className={"content-wrapper"}>
                <Header title={title}></Header>
                <div className={"content-body"}>
                    <div className={"content-body-center"}>
                        <div className={"content-body-center-markdown"}>
                            <ReactMarkdown source={content} renderers={{heading: headingRenderer}}/>
                        </div>
                        <div className={"content-body-center-anchor"}>
                            <Anchor>
                                {/*{*/}
                                {/*    anchors.map(item => {*/}
                                {/*        return (*/}
                                {/*            <Link href={"#" + item.id} title={item.title}/>*/}
                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                            </Anchor>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}