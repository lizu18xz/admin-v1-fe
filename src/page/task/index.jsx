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
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadTaskList();
    }

    loadTaskList(){

        let listParam={
            page:this.state.pageNum,
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
        console.log("start")
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


    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="任务列表">

                    <div className="page-header-right">
                        <Link to="/task/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加任务</span>
                        </Link>
                    </div>

                </PageTitle>

                <ListSearch onSearch={(executorName)=>{this.onSearch(executorName)}}/>

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
                                        <a className="operation btn btn-xs btn-success">暂停</a>
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
