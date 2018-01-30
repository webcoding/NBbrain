import list from './home.scss';
import React from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import ListItem from '../common/listItem';
import SVG from '../common/SVG';
import utils  from '../common/utils';
import test_data from '../test_data';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            recentQbanks : [],
            recentChallenges : []
        }
        let fn = utils.promisify(utils.ajax);
        let promise = fn('get','${config.env}/recentUpdateQbank',null);
        let promise1 = fn('get','${config.env}/recentChallengedQbank',null);
        let that = this;
        promise.then((result)=>{
            that.setState({recentQbanks: result.data})
        });
        promise1.then((result)=>{
            that.setState({recentChallenges: result.data})
        });
    }
    render(){
        let {recentChallenges, recentQbanks} = this.state;
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>NBbrain</h3>
                    <SVG type="system" classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    {!!recentChallenges && recentChallenges.length>0 &&
                        <div>
                        <h3 className="nb_home_title">最近挑战过的题目</h3>
                        <ul className="nb_list">
                            {recentChallenges.map((item,index) => <ListItem key={index} item={item}/>)}
                        </ul>
                        </div>
                    }
                    {!!recentQbanks && recentQbanks.length>0 &&
                        <div>
                        <h3 className="nb_home_title">最新题目</h3>
                        <ul className="nb_list">
                            {recentQbanks.map((item,index) => <ListItem key={index} item={item}/>)}
                        </ul>
                        </div>
                    }
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
