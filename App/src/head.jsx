import React from 'react';
import {Link} from 'react-router-dom';
import header from './sass/header';
import SVG from './common/SVG';

export default class  Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {leftType, rightType, centerType, center, title} = this.props;
        console.log(this.props.children);
        const Left = (
            <div className="nb_top_left">
            {
                leftType === "back" ?
                (<Link to=""><SVG type="back"/></Link>) : (leftType === "home" ?  <Link to="/index"><SVG type="home"/></Link> : this.props.children)
            }
            </div>
        )
        const Right = (
            <div className="nb_top_right">
            {
                rightType === "account" ?
                (<Link to=""><SVG type="account"/></Link>) : (rightType === "add" ?  <Link to=""><SVG type="add"/></Link> : this.props.children)
            }
            </div>
        )
        const Center = (
            <div className="nb_top_center">
            {
                centerType === "title"? <h3>{title}</h3>: this.props.children
            }
            </div>
        )
        return (
            <div className="nb_top_wrap">
                <div className="nb_top_content">
                    {Left}
                    {Center}
                    {Right}
                </div>
            </div>
        );
    }
}
