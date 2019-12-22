import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Anchor} from "antd";

const {Link} = Anchor;

class MarkdownAnchor extends Component {

    getAnchors = (anchors, parentLevel) => {
        return anchors.map((anchor, index) => {
            if (anchor.level - 1 === parentLevel) {
                return (<Link key={anchor.id} href={"#" + anchor.id} title={anchor.title}>
                    {this.getAnchors(anchors.slice(index + 1), anchor.level)}
                </Link>)
            }
        })
    }

    render() {
        const splitAnchors = [];
        // 按照 level 1 将一维数组拆分为二维数组
        this.props.anchors.forEach(anchor => {
            if (anchor.level === 1) {
                const splitAnchor = [anchor];
                splitAnchors.push(splitAnchor);
            } else {
                splitAnchors[splitAnchors.length - 1].push(anchor)
            }
        })
        return (
            <Anchor>
                {
                    splitAnchors.map(
                        anchors => {
                            return this.getAnchors(anchors, 0)
                        }
                    )
                }
            </Anchor>
        )
    }
}

const mapState = (state) => ({
    anchors: state.anchors
})

export default connect(mapState)(withRouter(MarkdownAnchor))