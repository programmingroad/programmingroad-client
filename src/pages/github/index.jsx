import React, {Component} from "react";
import {reqLogin} from '../../api'
import * as actionCreator from '../../store/actionCreator'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Spin} from "antd";

import './index.less'

class CallBack extends Component {

    getUserInfo = () => {
        const path = this.props.location.search;
        const param = path.substring(1);
        reqLogin(param).then(
            data => {
                this.props.setAdmin(data.body)
                this.props.history.push('/admin/home')
            }
        ).catch(
            () => {
                this.props.history.push('/login')
            }
        )
    }

    UNSAFE_componentWillMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <div className="callback">
                <Spin size={'large'}/>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    setAdmin(admin) {
        dispatch(actionCreator.setAdmin(admin))
    }
})

export default connect(null, mapDispatch)(withRouter(CallBack))

