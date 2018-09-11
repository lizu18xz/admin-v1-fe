import React from 'react';
import {  Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination  from 'util/pagination/index.jsx'
import Actuator from 'service/actuator-service.jsx';
import TableList from "util/table-list/index.jsx";
import MUtil from 'util/mm.jsx';
const _mm     =new MUtil();
const _actuator=new Actuator();

class ActuatorList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            list:[],
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadActuatorList();
    }

    loadActuatorList(){
       /* _actuator.getActuatorList({}).then(res=>{
              this.setState(res)
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        });*/
    }

    //页码变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadActuatorList();
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="执行器列表"/>

                <TableList tableHeads={['ID','执行器名称','执行器类型','创建者','创建时间']}>
                    {
                        this.state.list.map((actuator,index)=>{
                            return(
                                <tr key={index}>
                                    {/*<td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.createTime).toLocaleString()}</td>*/}
                                </tr>
                            );
                        })
                    }
                </TableList>

                <Pagination current={11} total={200} onChange={(pageNum)=>{console.log(pageNum)}}/>
                {/* <Pagination current={this.state.pageNum} total={this.state.total}
                                onChange={(pageNum) =>{this.onPageNumChange(pageNum)}}/>*/}
            </div>
        );
    }
}

export default ActuatorList;
