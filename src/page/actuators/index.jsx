import React from 'react';
import {  Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import Actuator from 'service/actuator-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();
const _actuator=new Actuator();

class ActuatorList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadActuatorList();
    }

    loadActuatorList(){
       /* _actuator.getActuatorList({}).then(res=>{

        },errMsg=>{
            _mm.errorTips(errMsg)
        });*/
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="执行器列表"/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default table-list">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>ID</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>123</td>
                                        <td>123</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination current={11} total={200} onChange={(pageNum)=>{console.log(pageNum)}}/>
                </div>

            </div>
        );
    }
}

export default ActuatorList;
