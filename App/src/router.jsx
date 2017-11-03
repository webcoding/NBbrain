import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link, browserHistory} from 'react-router-dom';
import Home from './home';
import Rank from './rank';
import QbankRank from './qbankRank';
import MyQbank from './MyQbank';
import Edit from './edit';
import EditQuestion from './editQuestion/';
import User from './user';
import Login from './login';
import NoMatch from './noMatch';

const element =  document.getElementsByClassName('mod-app')[0];


ReactDOM.render(
    (<BrowserRouter history={browserHistory}>
        <div>
            <Route path="/index" component={Home}/>
            <Route path="/rank" component={Rank}/>
            <Route path="/qbank_rank" component={QbankRank}/>
            <Route path="/myqbank(/:userid)?" component={MyQbank}/>
            <Route path="/myqbank/edit(/:qbankid)?" component={Edit}/>
            <Route path="/myqbank/edit_question(/:qbankid)?(/:questionid)?" component={EditQuestion}/>
            <Route path="/user/:userid" component={User}/>
            <Route path="/login" component={Login}/>
            <Route exact path="*" component={NoMatch}/>
        </div>
    </BrowserRouter>
),element);

// path路由的匹配规则，省略即总会加载指定组件；/:name  (/:name)  /*.*   /*  /**/*
//   /   ?   #    this.props.params.id    *  非贪婪   **  贪婪  ?  this.props.location.query.id
// <Router history={hasHistory} routes="routesHTML">  <Link to="">  <AppLayout>  <Layout>  <InvoicesNav/>  <Media>  ? <Switch> : <Switch>  <Redirect from="" to=""/>  <IndexRedirect/> <Route/>   <IndexRoute/>  根路由的子组件
// <MemoryRouter>

// connect()()   observer()

// HashRouter  or  BrowserRouter
// hashHistory
// <Link to="/">home</Link>


// const routes = [
//     { component: Root,
//       routes: [
//         { path: '/',
//           exact: true,
//           component: Home
//         },
//         { path: '/child/:id',
//           component: Child,
//           routes: [
//             { path: '/child/:id/grand-child',
//               component: GrandChild
//             }
//           ]
//         }
//       ]
//     }
//   ]

// {renderRoutes(routes)}
