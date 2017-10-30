import {React, Component} from 'react';
import render from 'react-dom';

const Bottom = (props) => {
    return (
        <div className="nb_footer">
            <i className="nb_icon nb_icon_newest" onClick={this.jump.bind(this)}></i>
            <i className="nb_icon nb_icon_list"></i>
            <i className="nb_icon nb_icon_edit"></i>
            <i className="nb_icon nb_icon_user"></i>
        </div>
    )
}
return render(<Bottom/>, document.body);

// class aa extends component {
//     render(){
//         return ()
//     }
// }
