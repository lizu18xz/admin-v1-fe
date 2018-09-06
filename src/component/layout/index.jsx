/**
 * 布局
 * */
import React from 'react';
import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';
import './theme.css';
import './index.scss'


class Layout extends React.Component{

    constructor(props){
        super(props)
    }


    //渲染 头部导航，侧边导航，子组件
    render() {
        return (
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        );
    }

}

export default Layout;
