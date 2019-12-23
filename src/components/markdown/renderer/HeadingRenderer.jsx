import React, {Component} from "react";
import * as actionCreator from "../../../store/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


class HeadingRenderer extends Component {

    constructor(props) {
        super(props);
        this.anchor = {};
    }

    render() {
        if (!this.anchor.id) {
            this.anchor = {
                level: this.props.level,
                id: "heading-" + this.props.id,
                title: this.props.children
            }
            if (this.props.level === 1) {
                this.props.addAnchor(this.anchor);
            }
        }
        return React.createElement('h' + this.anchor.level, {id: this.anchor.id}, this.anchor.title);
    }
}

const mapDispatch = (dispatch) => ({
    addAnchor(anchor) {
        dispatch(actionCreator.addAnchor(anchor))
    }
})

export default connect(null, mapDispatch)(withRouter(HeadingRenderer))
