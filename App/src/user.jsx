import React from 'react';
// this.props.loaction.query.bar  获取参数 ?
// this.props.params.id    获取参数 :

class  User extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                <h3>最近挑战过的题目：</h3>
                    <dl className="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div className="nb_list_oper">
                                <i className="nb_icon nb_icon_star"></i>
                                <i className="nb_icon nb_icon_share"></i>
                                <button className="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                    <h3>最新题目：</h3>
                    <dl className="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div className="nb_list_oper">
                                <i className="nb_icon nb_icon_star"></i>
                                <i className="nb_icon nb_icon_share"></i>
                                <button className="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        );
    }
}
export default User;
