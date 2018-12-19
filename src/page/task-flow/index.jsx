import React from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import TaskFlow from 'service/taskflow-service.jsx';
import TableList from "util/table-list/index.jsx";
import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();
const _taskFlow=new TaskFlow();

class TaskFlowList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            content:[],
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadTaskFlowList();
    }

    loadTaskFlowList(){
        _taskFlow.getTaskFlowList(this.state.pageNum).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                content:[]
            })
            _mm.errorTips(errMsg)
        });
    }


    deleteByID(id){
        if(window.confirm("确定要删除此任务流")){
            _taskFlow.delete(id).then(res=>{
                this.loadTaskFlowList();
            },errMsg=>{
                _mm.errorTips(errMsg)
            });
        }
    }

    updateFlowStatus(e,id,status){
        let newStatus    = status,
            confirmTips  = status ==1
                ?'确定要下线该任务流?':'确定要上线该任务流?';

        if(window.confirm(confirmTips)){

            _taskFlow.upOrDown(id,status).then(res=>{
                  _mm.successTips("操作成功!")
                  this.loadTaskFlowList();
                },errMsg=>{
                    _mm.errorTips(errMsg)
                });
            }
    }


    //页码变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadTaskFlowList();
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="任务流列表">

                    <div className="page-header-right">
                        <Link to="/task-flow/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加任务流</span>
                        </Link>
                    </div>

                </PageTitle>

                <TableList tableHeads={['ID','任务流名称','调度方式','调度频率','开始时间','状态','操作']}>
                    {
                        this.state.content.map((taskflow,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{taskflow.id}</td>
                                    <td>{taskflow.name}</td>
                                    <td>{taskflow.jobCycleDesc}</td>
                                    <td>{taskflow.jobCycleValue}</td>
                                    <td>{new Date(taskflow.startAt).toLocaleString()}</td>
                                    <td> {taskflow.flowStatus == 1 ? '上线':'下线'}</td>
                                    <td>
                                        <Link className="operation btn btn-xs btn-success" to={`/task-flow/design/${taskflow.id}`} >任务设计</Link>
                                        <button className="operation btn btn-xs btn-success"
                                                onClick={(e)=>this.updateFlowStatus(e,taskflow.id,taskflow.flowStatus)} >
                                            {taskflow.flowStatus == 1 ? '下线':'上线'}
                                        </button>
                                        <a className="operation btn btn-xs btn-info" onClick={(e)=>this.deleteByID(taskflow.id)}>删除</a>
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

export default TaskFlowList;
