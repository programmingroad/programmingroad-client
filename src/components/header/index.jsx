import React, {Component} from "react";

import './index.less'

class HomeHeader extends Component {

    render() {
        const {title} = this.props;
        return (
            <div className={"home-header"}>
                <div className={"home-header-title"}>{title}</div>
            </div>
        )
    }
}

export default HomeHeader;