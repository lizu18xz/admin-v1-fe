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

    //加载执行器
    loadTaskExecutor(){
        _task.getTaskExecutor().then(res=>{
            this.setState({
                executorContent:res.content
            },(e)=>{
                //此处可以等请求完成后处理想处理的事情
                this.loadTaskList()
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


    runTask(jobId){
        if(window.confirm("是否执行一次任务")){
            _task.runTask(jobId).then(res=>{
                _mm.successTips("执行成功")
            },errMsg=>{
                _mm.errorTips(errMsg)
            });
        }
    }


    render() {

        return (
            <div id="page-wrapper">

                <PageTitle title="任务列表">

                </PageTitle>

                <ListSearch onSearch={(executorName)=>{this.onSearch(executorName)}}  selectContent={this.state.executorContent} />

                <TableList tableHeads={['ID','任务描述','所属任务流','执行器类型','发布状态','任务类型','执行频率','修改时间','操作']}>
                    {
                        this.state.content.map((task,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{task.id}</td>
                                    <td>{task.jobDesc}</td>
                                    <td>{task.flowName}</td>
                                    <td>{task.executorType}</td>
                                    <td>{task.flowStatus == 1 ? '下线':'上线'}</td>
                                    <td>{task.jobType}</td>
                                    <td>{task.cycle}</td>
                                    <td>{new Date(task.updateTime).toLocaleString()}</td>
                                    <td>
                                        <a className="operation btn btn-xs btn-info">详情</a>
                                        <a className="operation btn btn-xs btn-success" onClick={(e)=>this.runTask(task.id,task.jobGroup)}>单独执行</a>
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
