import {Router, Route, Link} from 'react-router';
import home from './home';
import createQbank from './createBank';
import noMatch from './noMatch';
import login from './login';
React.render((
    <Router>
        <Route path="/index" component={home}>
            <Route path="list" component={createQbank}></Route>
            <Route path="edit" component={createQbank}></Route>
            <Route path="user/id" component={user}></Route>
            <Route path="login" component={login}></Route>
            <Route path="*" component={noMatch}></Route>
        </Route>
    </Router>
), document.body);