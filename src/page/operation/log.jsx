import React from 'react';
import './log.scss';
import PageTitle from 'component/page-title/index.jsx'
import Operation from 'service/oper-service.jsx';
import MUtil from 'util/mm.jsx';
import {Link} from "react-router-dom";
const _mm     =new MUtil();
const _operation=new Operation();

class LogPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            logId:this.props.match.params.logId,
            pointer: 0,
            content:'',
            newContent:''
        }
    }

    componentDidMount(){

        this.loadLogInfo();
    }


    //详情
    loadLogInfo(){
        let listParam={
            logId: this.state.logId,
            pointer: this.state.pointer
        }
        _operation.getLog(listParam).then(res=>{
            //成功后,设置pointer下次使用
            this.setState({
                content:res.content,
                pointer:res.pointer
            },()=>{
                this.addNews(this.state.content)
            })

        },errMsg=>{
            _mm.errorTips(errMsg)
        });

    }

    refresh(){
        this.loadLogInfo();
    }


    addNews(newContent) {
        this.setState({
            newContent: this.state.newContent.concat(newContent)
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="实时日志">
                    <div className="page-header-right">
                        <button  className="btn btn-primary" onClick={(e) => this.refresh()}>
                            <i className="fa fa-refresh"></i>
                            <span>刷新日志</span>
                        </button>
                    </div>
                </PageTitle>

                <div className="row">
                    <div className="col-md-12">
                        <pre className="pre">
                            {this.state.newContent}
                        </pre>
                    </div>
                </div>

            </div>
        );
    }
}

export default LogPage;
