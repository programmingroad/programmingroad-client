import React, {Component} from "react";
import {Button} from "antd";
import './index.less'

export default class Login extends Component {

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