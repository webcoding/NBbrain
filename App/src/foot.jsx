import React from 'react';
import footer from './sass/footer';

export default class  Footer extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="nb_bottom_wrap">
                <ul className="nb_bottom_content">
                    <li>首页</li>
                    <li>列表</li>
                    <li>我的题库</li>
                    <li>个人中心</li>
                </ul>
            </div>
        );
    }
}
