import React, {Component} from "react";
import {Tabs} from "antd";
import Header from "../../components/header";

import './index.less'
import {reqAllTag} from "../../api";

const {TabPane} = Tabs;

export default class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            tagList: [],
            articleList: []
        })
    }

    getTagList = async () => {
        const data = await reqAllTag();
        this.setState({
            tagList: data.body
        })
    }

    componentDidMount() {
        this.getTagList();
    }

    render() {
        const {tagList} = this.state;
        return (
            <div className={"blog-wrapper"}>
                <Header title={"Hello World"}></Header>
                <div className={"blog-content"}>
                    {
                        tagList.length > 0 ?
                            <Tabs defaultActiveKey={tagList[0].id} style={{width: '50%'}}>
                                {
                                    tagList.map(
                                        item => {
                                            return <TabPane tab={item.name} key={item.id}>
                                                {item.name}
                                            </TabPane>
                                        }
                                    )
                                }
                            </Tabs>
                            :
                            undefined
                    }
                </div>
            </div>
        )
    }
}