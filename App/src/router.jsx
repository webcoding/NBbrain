import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './home';
import List from './list';
import createQbank from './createBank';
import User from './user';
import login from './login';
import NoMatch from './noMatch';
const App = () =>(
    <BrowserRouter>
        <Route exact path="/index" component={Home}/>
        <Route path="list" component={List}/>
        <Route path="edit" component={createQbank}/>
        <Route path="user/id" component={User}/>
        <Route path="login" component={login}/>
        <Route exact path="*" component={NoMatch}/>
    </BrowserRouter>
);

ReactDOM.render(App, document.body)
// HashRouter  or  BrowserRouter
// hashHistory
// <Link to="/">home</Link>
