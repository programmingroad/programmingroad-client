import React, {Component} from "react";


export default class HeadingRenderer extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return React.createElement('h' + this.props.level, {id: this.props.level}, this.props.children);
    }
}