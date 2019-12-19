import React, {Component} from "react";


export default class HeadingRenderer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.props.setAnchor(this.props.level, this.props.level);
        return React.createElement('h' + this.props.level, {id: this.props.level}, this.props.children);
    }
}