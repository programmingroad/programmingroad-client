import React, {Component} from "react";
import './index.less'
import {Button} from "antd";

export default class Header extends Component {

    render() {
        return (
            <div className='header'>
                <Button
                    type="primary"
                    shape="circle"
                    icon="mail"
                    style={{
                        backgroundColor: '#785ac3',
                        marginRight: '10px',
                        border: "none"
                    }}/>
                <Button
                    type="primary"
                    shape="circle"
                    icon="search"
                    style={{
                        backgroundColor: '#785ac3',
                        marginRight: '20px',
                        border: "none"
                    }}/>
            </div>
        )
    }
}