import React from 'react';
import header from './sass/header';

export default class  Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {leftType, rightType, centerType, center} = this.props;
        const Left = (<div className="nb_top_left">{leftType === 'back' ? <a>返回</a> : <a>其他</a>}</div>)
        const Right = (<div className="nb_top_right">{rightType === 'menu' ? <a>菜单</a> : <a>创建</a>}</div>)
        const Center = (<div className="nb_top_center">{centerType === 'title'? <h3>{title}</h3>:<div className="nb_slot_wrap">其他</div>}</div>)
        return (
            <div className="nb_top_wrap">
                <div className="nb_top_content">
                    <Left/>
                    <Center/>
                    <Right/>
                </div>
            </div>
        );
    }
}
