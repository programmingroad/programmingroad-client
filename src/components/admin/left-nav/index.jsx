import React, {Component} from "react";
import {Avatar, Icon, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import menuList from "../../../config/menuConfig";
import {connect} from "react-redux";

import './index.less'

class AdminLeftNav extends Component {

    /*
    根据menu的数据数组生成对应的标签数组
    使用map() + 递归调用
    */
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            return (
                <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    //在第一次render()之前执行一次
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        // 获取当前请求的路由路径
        const path = this.props.location.pathname;

        const {login, avatarUrl} = this.props.admin;

        return (
            <div className="admin-left-nav">
                <div className="admin-left-nav-header">
                    <Avatar
                        src={avatarUrl}
                        size={50}
                        style={{
                            marginBottom: '10px',
                        }}
                    />
                    <h1>{login}</h1>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

const mapState = (state) => ({
    admin: state.admin
})

export default connect(mapState, null)(withRouter(AdminLeftNav))