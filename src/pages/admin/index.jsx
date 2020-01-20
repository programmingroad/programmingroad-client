import React, {Component} from "react";

import {Layout} from 'antd';
import LeftNav from "../../components/admin/left-nav";
import AdminHeader from "../../components/admin/header";
import AdminHome from "./home";
import AdminEdit from "./edit";
import AdminTags from "./tags";
import AdminArticles from "./articles";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AdminDrafts from "./drafts";
import AdminCovers from "./covers";

const {Content, Sider} = Layout;

class Admin extends Component {

    render() {
        return (
            this.props.admin ?
                <Layout style={{height: '100%'}}>
                    <AdminHeader></AdminHeader>
                    <Layout>
                        <Sider>
                            <LeftNav/>
                        </Sider>
                        <Content>
                            <Switch>
                                <Route exact path='/admin/home' component={AdminHome}/>
                                <Route exact path='/admin/edit/:id?' component={AdminEdit}/>
                                <Route exact path='/admin/tags' component={AdminTags}/>
                                <Route exact path='/admin/articles' component={AdminArticles}/>
                                <Route exact path='/admin/drafts' component={AdminDrafts}/>
                                <Route exact path='/admin/covers' component={AdminCovers}/>
                                <Redirect to='/admin/home'/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                :
                <Redirect to={"/login"}/>
        )
    }
}

const mapState = (state) => ({
    admin: state.admin
})

export default connect(mapState, null)(withRouter(Admin))