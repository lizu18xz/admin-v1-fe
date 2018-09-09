/**
 * 头部
 * */
import React         from 'react';
import { Link }     from 'react-router-dom'
import MUtil from 'util/mm.jsx';
const _mm=new MUtil();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:_mm.getStorage('userInfo').username || ''
        }
    }

    //退出登录
    onLogout(){

        _mm.removeStorage('userInfo');
        window.location.href='/login';

    }

    render(){
        return(
            <div className="navbar navbar-default top-navbar" >
                <div className="navbar-header">
                    <Link className="navbar-brand" to="index.html"><b>FAYA</b>JOB</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username ? <span>欢迎,{this.state.username}</span>:<span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={()=>this.onLogout()}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}

export default NavTop;