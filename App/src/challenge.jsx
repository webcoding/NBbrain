import React from 'react';
import config from './config';

const NoMatch = React.createClass({
    render(){
        return (
            <div class="nb_wrap">
                <div class="nb_content">
                   <h3>题库名</h3>
                   <img alt="素材"/>
                   <p><strong>10</strong>后开始答题</p>
                   <button class="nb_btn nb_btn_grey">退出挑战</button>
                </div>
            </div>
        );
    }
});
export default NoMatch;