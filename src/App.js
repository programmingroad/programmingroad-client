import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Login from "./pages/login";
import Admin from "./pages/admin";
import Blog from "./pages/blog";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                    <Route exact path='/' component={Blog}/>
                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
