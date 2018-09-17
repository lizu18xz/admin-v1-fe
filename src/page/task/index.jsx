import React from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import TableList from "util/table-list/index.jsx";
import ListSearch from "page/task/index-list-search.jsx";
import MUtil from 'util/mm.jsx';
import Task from 'service/task-service.jsx';
const _mm     =new MUtil();
const _task   =new Task();

class TaskList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            content:[],
            pageNum:1,
            executorContent:[], //执行器列表
            executorType:'',    //执行器类型
        }
    }

    componentDidMount(){
        //加载所有的执行器
        this.loadTaskExecutor();
    }

    //加载执行器 TODO 初始化对应的内容
    loadTaskExecutor(){
        _task.getTaskExecutor().then(res=>{
            this.setState({
                executorContent:res.content
            },(e)=>{
                let executors=res.content;
                this.setState({
                    executorType: executors[0].name
                },(e)=>{
                    this.loadTaskList()
                })
            })
        },errMsg=>{
            _mm.errorTips(errMsg)
        });
    }

    //加载对应执行器下面的任务
    loadTaskList(){
        let listParam={
            page:this.state.pageNum,
            executorType: this.state.executorType
        }
        _task.getTaskList(listParam).then(res=>{
            this.setState(res)
        },errMsg=>{
            this.setState({
                content:[]
            })
            _mm.errorTips(errMsg)
        });
    }

    //搜索(选择执行器或者输入关键词进行搜索)
    onSearch(executorName){
        this.setState({
            pageNum :1,
            executorType:executorName
        },()=>{
            this.loadTaskList();
        })
    }

    //页码变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadTaskList();
        });
    }

    onSetTaskStatus(e,jobId,jobGroupId,status){
        let newStatus    = status,
            confirmTips  = status ==1
                ?'确定要下线该任务?':'确定要上线该任务?';

        let JobInfoParams={
            jobId:jobId,
            jobGroup:jobGroupId
        }

        if(window.confirm(confirmTips)){
           if(newStatus==1){//现在是上线状态 调用下线接口
               _task.pause(JobInfoParams).then(res=>{
                   this.loadTaskList();
               },errMsg=>{
                   _mm.errorTips(errMsg)
               });

           }else if(newStatus == 2){//现在是下线状态 调用上线接口

               _task.resume(JobInfoParams).then(res=>{
                   this.loadTaskList();
               },errMsg=>{
                   _mm.errorTips(errMsg)
               });
           }
        }
    }


    render() {



        return (
            <div id="page-wrapper">

                <PageTitle title="任务列表">

                    <div className="page-header-right">
                        <Link to={`/task/save/${this.state.executorType}`} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加任务</span>
                        </Link>
                    </div>

                </PageTitle>

                <ListSearch onSearch={(executorName)=>{this.onSearch(executorName)}}  selectContent={this.state.executorContent} />

                <TableList tableHeads={['ID','任务描述','执行器类型','状态','任务类型','创建时间','修改时间','操作']}>
                    {
                        this.state.content.map((task,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{task.id}</td>
                                    <td>{task.jobDesc}</td>
                                    <td>{task.executorType}</td>
                                    <td>正常</td>
                                    <td>{task.jobType}</td>
                                    <td>{new Date(task.createTime).toLocaleString()}</td>
                                    <td>{new Date(task.updateTime).toLocaleString()}</td>
                                    <td>
                                        <a className="operation btn btn-xs btn-info">详情</a>
                                        <a className="operation btn btn-xs btn-success">编辑</a>
                                        <button className="operation btn btn-xs btn-success" onClick={(e)=>this.onSetTaskStatus(e,task.id,task.jobGroup,task.jobStatus)}>
                                            {task.jobStatus == 1 ? '下线':'上线'}
                                        </button>
                                        <a className="operation btn btn-xs btn-success">删除</a>
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

export default TaskList;
