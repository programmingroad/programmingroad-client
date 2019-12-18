import React, {Component} from "react";
import {Avatar, Button, Popover} from "antd";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {reqLogout} from '../../../api'
import cookie from "react-cookies";

import './index.less'

class AdminHeader extends Component {

    logout = () => {
        // 阻止跳转
        const token = cookie.load("token");
        if (token) {
            reqLogout().then(
                () => {
                    this.props.history.push('/login')
                }
            );
        }
    }

    render() {
        const {avatarUrl} = this.props.admin;
        return (
            <div className='admin-header'>
                <Button
                    type="primary"
                    shape="circle"
                    icon="mail"
                    style={{
                        backgroundColor: '#785ac3',
                        marginRight: '20px',
                        border: "none"
                    }}/>
                <Popover
                    placement="bottomRight"
                    content={<Link to="#" onClick={this.logout}>退出</Link>}
                >
                    <Avatar
                        src={avatarUrl}
                        style={{
                            marginRight: '20px',
                            cursor: 'pointer'
                        }}
                    />
                </Popover>

            </div>
        )
    }
}

const mapState = (state) => ({
    admin: state.admin
})

export default connect(mapState, null)(withRouter(AdminHeader))