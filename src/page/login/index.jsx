
import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
const _mm     =new MUtil();
const _user   =new User();

import './index.scss';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    componentWillMount(){
        document.title='登录 - FAYA MMALL'
    }

    onInputChange(e){
        let inputValue=e.target.value,
            inputName=e.target.name;
        this.setState({
            [inputName]:inputValue
        })
    }

    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

    onSubmit(e){
        let loginInfo={
                username:this.state.username,
                password:this.state.password
            }
        console.log(loginInfo)

        _user.login(loginInfo).then((res=>{

        }),(err)=>{

        })

    }

    render(){
        return (
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading login-title">欢迎登陆  FAYA MMALL管理系统</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text" name="username"
                                           className="form-control login-input"  placeholder="请输入用户名"
                                           onKeyUp={e=> this.onInputKeyUp(e)}
                                           onChange={e=>this.onInputChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password"
                                           className="form-control login-input"  placeholder="请输入密码"
                                           onKeyUp={e=> this.onInputKeyUp(e)}
                                           onChange={e=>this.onInputChange(e)}/>
                                </div>
                                <button className="btn btn-primary btn-block m-t-25" onClick={ e=>{this.onSubmit(e)} }>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Login;