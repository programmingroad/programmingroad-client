import React, {Component} from "react";
import {Button} from "antd";
import {reqGetUser} from "../../api";
import cookie from 'react-cookies';
import * as actionCreator from "../../store/actionCreator";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import './index.less'

class Login extends Component {

    getUserInfo = async () => {

        const token = cookie.load("token");

        if (token) {
            const data = await reqGetUser();

            this.props.setAdmin(data.body)

            this.props.history.replace('/admin/home')
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <div className="login">
                <Button type={'primary'}
                        icon={'github'}
                        shape={'circle'}
                        size={'large'}
                        href={"https://github.com/login/oauth/authorize?client_id=90311b932a081ea68e12"}
                />
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    setAdmin(admin) {
        dispatch(actionCreator.setAdmin(admin))
    }
})

export default connect(null, mapDispatch)(withRouter(Login))