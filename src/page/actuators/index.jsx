import React from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
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
            content:[],
            pageNum:1
        }
    }

    componentDidMount(){
        this.loadActuatorList();
    }

    loadActuatorList(){
        _actuator.getActuatorList(this.state.pageNum).then(res=>{
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
            this.loadActuatorList();
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="执行器列表">

                    <div className="page-header-right">
                        <Link to="/" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加执行器</span>
                        </Link>
                    </div>

                </PageTitle>

                <TableList tableHeads={['ID','执行器名称','执行器类型','创建时间','修改时间','操作']}>
                    {
                        this.state.content.map((actuator,index)=>{
                            return(
                                <tr key={index}>
                                        <td>{actuator.id}</td>
                                        <td>{actuator.name}</td>
                                        <td>{actuator.groupDesc}</td>
                                        <td>{new Date(actuator.createTime).toLocaleString()}</td>
                                        <td>{new Date(actuator.updateTime).toLocaleString()}</td>
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
