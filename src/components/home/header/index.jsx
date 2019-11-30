import React, {Component} from "react";
import './index.less'
import {Avatar, Button, Popover} from "antd";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {reqGetUser, reqLogout} from '../../api'
import cookie from "react-cookies";

class HomeHeader extends Component {
    render() {
        return (
            <div>home header</div>
        )
    }
}

export default HomeHeader;