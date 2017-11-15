import list from './home.scss';
import React from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import ListItem from '../common/listItem';
import SVG from '../common/SVG';
import test_data from '../test_data';
class Home extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>NBbrain</h3>
                    <SVG type="system" classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    <h2 className="nb_home_title">最近挑战过的题目</h2>
                    <ul className="nb_list">
                        {test_data.home.data.map((item,index) => <ListItem key={index} item={item}/>)}
                    </ul>
                    <h2 className="nb_home_title">最新题目</h2>
                    <ul className="nb_list">
                        {test_data.home.data.map((item,index) => <ListItem key={index} item={item}/>)}
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default Home;

// withRouter(connect()())

// core
// React.createElement()
// React.Component
// React.Children

// components
// React.Component
// React.PureComponent

// shouldComponentUpdate()

// elements
// createElement()
// createFactory()
// cloneElement()
// isValidElement()
// React.Children

// React.Component
// ReactDOM.render
// React.Component  React.createClass  React   React.PureComponent
// React.createElement('tag',{attr}, 'text')   createFactory(type)
// cloneElement()    isValidElement()    React.Children
