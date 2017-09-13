import {React, Component} from 'react';
import render from 'react-dom';
import {Router, Route, Link} from 'react-router';

const Bottom = (props) => {
    return (
        <div className="nb_footer">
            <i className="nb_icon nb_icon_newest">
                <Link to="/"></Link>
            </i>
            <i className="nb_icon nb_icon_list">
            <Link to="/list"></Link>
            </i>
            <i className="nb_icon nb_icon_edit">
                <Link to="/edit"></Link>
            </i>
            <i className="nb_icon nb_icon_user">
                <Link to="/user/:uid"></Link>
            </i>
        </div>
    )
}
return render(<Bottom/>, document.body);

// class aa extends component {
//     render(){
//         return ()
//     }
// }
