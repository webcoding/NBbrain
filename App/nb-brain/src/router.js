import {Router, Route, Link} from 'react-router'
import home from './home'
import createQbank from './createBank'
import noMatch from './noMatch'

React.render((
    <Router>
        <Route path="/" component={home}>
            <Route path="/" component={createQbank}></Route>
            <Route path="*" component={noMatch}></Route>
        </Route>
    </Router>
), document.body)
