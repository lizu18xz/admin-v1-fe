/**
 * 侧边
 * */
import React         from 'react';
import { Link,NavLink}     from 'react-router-dom'

class NavSide extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">

                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>

                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-list"></i>
                                <span>任务</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/actuator" activeClassName="active-menu" >执行器管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/task-flow" activeClassName="active-menu" >任务流管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/task" activeClassName="active-menu" >任务管理</NavLink>
                                </li>

                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/order">
                                <i className="fa fa-check-square-o"></i>
                                <span>运维</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/operation" activeClassName="active-menu">运维中心</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                            </ul>
                        </li>


                    </ul>

                </div>

            </div>
        )
    }
}

export default NavSide;