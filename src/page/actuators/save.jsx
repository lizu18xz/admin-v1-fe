import React from 'react';
import './save.scss';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from "util/mm.jsx";
import Actuator from 'service/actuator-service.jsx';
const _mm     =new MUtil();
const _actuator     =new Actuator();

class ActuatorSave extends React.Component{

    constructor(props){
        super(props)
        //定义执行器信息
        this.state={
            name:'',
            groupDesc:'',
            seq:'',
            id:this.props.match.params.id,
        }
    }

    componentDidMount(){
        this.loadActuators();
    }

    loadActuators(){
        console.log(this.state.id)
        //有id时候，编辑 功能需要表单回填
        if(this.state.id){
            _actuator.detail(this.state.id).then(res=>{

                this.setState(res);

            },errMsg=>{
                _mm.errorTips(errMsg)
            });
        }
    }


    //onValueChange 简单字段的改变
    onValueChange(e){
        let name=e.target.name,
            value=e.target.value.trim();
        this.setState({
            [name]:value
        })
    }


    onSubmit(){
        let groupInfo={
            name:this.state.name,
            groupDesc:this.state.groupDesc,
            seq:this.state.seq
        }
        //TODO 表单验证

        if(this.state.id){
            groupInfo.id = this.state.id;
        }

        //提交信息
        _actuator.save(groupInfo).then(res=>{
            this.props.history.push('/actuator/index');
        },errMsg=>{
            _mm.errorTips(errMsg)
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="添加任务"/>

                <div className="form-horizontal">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">执行器名称(唯一)</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入执行器名称"
                                   name="name"
                                   value={this.state.name}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">执行器描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入执行器描述"
                                   name="groupDesc"
                                   value={this.state.groupDesc}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label  className="col-md-2 control-label">执行器顺序</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="顺序"
                                   name="seq"
                                   value={this.state.seq}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary"
                                    onClick={(e)=>{this.onSubmit()}}>提交</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ActuatorSave;
