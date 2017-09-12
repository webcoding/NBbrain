import React from 'react';
const List = React.createClass({
    render(){
        return (
            <div class="nb_wrap">
                <div class="nb_content">
                    <dl class="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div class="nb_list_oper">
                                <i class="nb_icon nb_icon_star"></i>
                                <i class="nb_icon nb_icon_share"></i>
                                <button class="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        );
    }
});
export default List;
