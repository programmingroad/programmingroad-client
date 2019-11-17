import React, {Component} from "react";

export default class CallBack extends Component {

    render() {

        let path = this.props.location.search;
        console.log(path)
        return (
            <div>CallBack</div>
        )
    }
}