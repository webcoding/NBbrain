import React from 'react';
import header from '../sass/header';
// import { names_ICON } from './tools';


export default class  SVG extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {type, classes} = this.props;
        let svg = require(`../../icon/${type}.svg`) || {};
        classes = !!classes ? "nb_font " + classes : "nb_font";
        // let names = names_ICON();
        // console.log(names);
        return (
            <svg className={classes}>
                <use className="nb_use" xlinkHref={svg.default}>
                </use>
            </svg>
        );
    }
}

