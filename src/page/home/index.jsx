import React from 'react';
import {  Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import './index.scss';

class Home extends React.Component{

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="首页"/>

                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">10</p>
                            <p className="desc">
                                <i className="fa fa-spinner"></i>
                                <span>执行器总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/user" className="color-box green">
                            <p className="count">30</p>
                            <p className="desc">
                                <i className="fa fa-tasks"></i>
                                <span>任务总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/user" className="color-box blue">
                            <p className="count">5</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>


                </div>

            </div>
        );
    }
}

export default Home;
