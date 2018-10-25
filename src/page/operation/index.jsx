import React from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import Operation from 'service/oper-service.jsx';
import TableList from "util/table-list/index.jsx";
import ListSearch from "page/operation/index-list-search.jsx";
import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();
const _operation=new Operation();

class OperationList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            content:[],
            pageNum:1,
            remoteIp:'',
            jobDesc:''
        }
    }

    componentDidMount(){
        this.loadOperationList();
    }

    loadOperationList(){

        let listParam={
            page:this.state.pageNum,
            remoteIp: this.state.remoteIp,
            jobDesc: this.state.jobDesc
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

    //搜索
    onSearch(remoteIp,jobDesc){
        this.setState({
            pageNum :1,
            remoteIp: remoteIp,
            jobDesc: jobDesc
        },()=>{
            this.loadOperationList();
        })
    }

    //详情
    loadLogInfo(e,executorAddress,logId){
        let listParam={
            executorAddress: executorAddress,
            logId: logId
        }
        _operation.getLog(listParam).then(res=>{
            console.log(res)
        },errMsg=>{
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

                <ListSearch onSearch={(remoteIp,jobDesc)=>{this.onSearch(remoteIp,jobDesc)}}/>

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
                                        <a className="operation btn btn-xs btn-info">详情</a>

                                        <button className="operation btn btn-xs btn-success"
                                           onClick={(e)=>this.loadLogInfo(e,jobLog.remoteIp,jobLog.id)}>日志</button>
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

export default OperationList;
