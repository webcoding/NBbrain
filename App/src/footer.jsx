import {React, Component} from 'react';
import render from 'react-dom';
import {Router, Route, Link} from 'react-router';

const Bottom = (props) => {
    return (
        <div class="nb_footer">
            <i class="nb_icon nb_icon_newest">
                <Link to="/"></Link>
            </i>
            <i class="nb_icon nb_icon_list">
            <Link to="/list"></Link>
            </i>
            <i class="nb_icon nb_icon_edit">
                <Link to="/edit"></Link>
            </i>
            <i class="nb_icon nb_icon_user">
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
