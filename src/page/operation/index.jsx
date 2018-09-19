import React from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import Operation from 'service/oper-service.jsx';
import TableList from "util/table-list/index.jsx";
import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();
const _operation=new Operation();

class ActuatorList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            content:[],
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadOperationList();
    }

    loadOperationList(){

        let listParam={
            pageNum:this.state.pageNum
        }

        _operation.getOperationList(listParam).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                content:[]
            })
            _mm.errorTips(errMsg)
        });
    }

    //页码变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadOperationList();
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="任务管理"/>

                <TableList tableHeads={['任务描述','执行机器','任务ID','创建时间','修改时间','操作']}>
                    {
                        this.state.content.map((jobLog,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{jobLog.jobDesc}</td>
                                    <td>{jobLog.remoteIp}</td>
                                    <td>{jobLog.jobId}</td>
                                    <td>{new Date(jobLog.createTime).toLocaleString()}</td>
                                    <td>{new Date(jobLog.updateTime).toLocaleString()}</td>
                                    <td>
                                        <a className="operation btn btn-xs btn-info" >详情</a>

                                        <a className="operation btn btn-xs btn-success" >编辑</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>

                <Pagination current={(this.state.number+1)} total={this.state.totalElements}
                            onChange={(pageNum) =>{this.onPageNumChange((pageNum))}}/>
            </div>
        );
    }
}

export default ActuatorList;
