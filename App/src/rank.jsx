import list from './sass/list.scss';
import React from 'react';
import Head from './head';
import Foot from './foot';
import ListItem from './common/list_item';
import test_data from './test_data';
class Rank extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <Head leftType="home" rightType="account" centerType="title" title="NBbrain"/>
                <div className="nb_content">
                    <ul className="nb_list">
                        {test_data.data.map((item,index) => <ListItem key={index} item={item}/>)}
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default Rank;
