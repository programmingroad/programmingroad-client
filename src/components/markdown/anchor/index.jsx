import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Anchor} from "antd";

const {Link} = Anchor;

class MarkdownAnchor extends Component {

    render() {
        return (
            <Anchor>
                {
                    this.props.anchors.map(
                        anchor => (<Link key={anchor.id} href={"#" + anchor.id} title={anchor.title}/>)
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