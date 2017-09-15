import list from './sass/list.scss';
import React from 'react';
class Home extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                <h3>最近挑战过的题目：</h3>
                    <dl className="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div className="nb_list_oper">
                                <i className="nb_icon nb_icon_star"></i>
                                <i className="nb_icon nb_icon_share"></i>
                                <button className="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                    <h3>最新题目：</h3>
                    <dl className="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div className="nb_list_oper">
                                <i className="nb_icon nb_icon_star"></i>
                                <i className="nb_icon nb_icon_share"></i>
                                <button className="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                </div>
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
