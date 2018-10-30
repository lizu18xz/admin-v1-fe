import React from 'react';
import Modal from 'react-modal';
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
            remote_ip:'',
            job_desc:'',
            showModal:false,
            logId:'',
            executorType:'',
            jobDesc:'',
            remoteIp:'',
            loadBalance:'',
            ha:'',
            retry:'',
        }

    }


    componentDidMount(){
        this.loadOperationList();
    }

    loadOperationList(){

        let listParam={
            page:this.state.pageNum,
            remoteIp: this.state.remote_ip,
            jobDesc: this.state.job_desc
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
            remote_ip: remoteIp,
            job_desc: jobDesc
        },()=>{
            this.loadOperationList();
        })
    }


    logDetail(logId){
         this.handleOpenModal(logId);
    }



    //页码变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadOperationList();
        });
    }


    handleOpenModal (logId) {
        this.setState({
            showModal: true,
            logId: logId
        });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }


    handleAfterOpenModal(){

        _operation.detail(this.state.logId).then(res=>{
            this.setState(res)
        },errMsg=>{
            _mm.errorTips(errMsg)
        });

    }


    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="任务管理"/>

                <ListSearch onSearch={(remoteIp,jobDesc)=>{this.onSearch(remoteIp,jobDesc)}}/>

                <TableList tableHeads={['任务描述','执行机器','任务ID','调度时间','操作']}>
                    {
                        this.state.content.map((jobLog,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{jobLog.jobDesc}</td>
                                    <td>{jobLog.remoteIp}</td>
                                    <td>{jobLog.jobId}</td>
                                    <td>{new Date(jobLog.createTime).toLocaleString()}</td>
                                    <td>
                                        <button className="operation btn btn-xs btn-info"
                                                onClick={(e)=>this.logDetail(jobLog.id)}>详情</button>
                                        <Link className="operation btn btn-xs btn-success" to={`/operation/log/${jobLog.id}`}>日志</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>

                <Pagination current={(this.state.number+1)} total={this.state.totalElements}
                            onChange={(pageNum) =>{this.onPageNumChange((pageNum))}}/>


                <div>
                    <Modal
                        className="Modal__Bootstrap modal-dialog"
                        closeTimeoutMS={150}
                        onAfterOpen={(e)=>this.handleAfterOpenModal()}
                        isOpen={this.state.showModal}
                        ariaHideApp={false}
                        className="Modal"
                        overlayClassName="Overlay">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={(e)=>this.handleCloseModal()}>&times;</button>
                                <h4 className="modal-title" id="myModalLabel">执行详情</h4>
                            </div>
                            <div className="modal-body">

                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label  className="col-md-2 control-label">所属执行器</label>
                                        <div className="col-md-5">
                                            <input type="text" className="form-control"
                                                   name="executor"
                                                   value={this.state.executorType}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-md-2 control-label">调度机器</label>
                                        <div className="col-md-5">
                                            <input type="text" className="form-control"
                                                   name="address"
                                                   value={this.state.remoteIp}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label  className="col-md-2 control-label">负载策略</label>
                                        <div className="col-md-5">
                                            <input type="text" className="form-control"
                                                   name="loadBalance"
                                                   value={this.state.loadBalance}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label  className="col-md-2 control-label">Ha策略</label>
                                        <div className="col-md-5">
                                            <input type="text" className="form-control"
                                                   name="Ha"
                                                   value={this.state.ha}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label  className="col-md-2 control-label">重试次数</label>
                                        <div className="col-md-5">
                                            <input type="text" className="form-control"
                                                   name="retry"
                                                   value={this.state.retry||''}
                                                   readOnly={true}
                                            />
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={(e)=>this.handleCloseModal()} >关闭</button>
                                <button type="button" className="btn btn-primary">提交更改</button>
                            </div>
                        </div>

                    </Modal>
                </div>

            </div>
        );
    }
}

export default OperationList;
