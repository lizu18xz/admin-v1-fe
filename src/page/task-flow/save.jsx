import React from 'react';
import './save.scss';
import PageTitle from 'component/page-title/index.jsx'
import MUtil from "util/mm.jsx";
import TaskFlow from "service/taskflow-service.jsx";
const _mm     =new MUtil();
const _taskFlow=new TaskFlow();
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import moment from 'moment';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
const format = 'YYYY-MM-DD HH:mm:ss';
const cn = location.search.indexOf('cn') !== -1;
const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}
const defaultCalendarValue = now.clone();
class TaskFlowSave extends React.Component{

    constructor(props){
        super(props)
        //定义执行器信息
        this.state={
            name:'',
            flowDesc:'',
            seq:'',
            jobCycle:'',
            jobCycleValue:'',
            flowPriority:'',
            startAt:'',
            id:this.props.match.params.id,
            showTime: true,
            showDateInput: true,
        }
    }

    getFormat(time) {
        return time ? format : 'yyyy-MM-dd HH:mm:ss';
    }

    onStandaloneChange(value) {
        this.setState({
            startAt:value.format(format)
        })
    }


    componentDidMount(){
        this.loadActuators();
    }

    loadActuators(){
        //有id时候，编辑 功能需要表单回填
        if(this.state.id){
            _taskFlow.detail(this.state.id).then(res=>{

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

    onCycleSelect(e){
        let newValue=e.target.value;
        this.setState({
            jobCycle:newValue,
        })
    }

    onPrioritySelect(e){
        let newValue=e.target.value;
        this.setState({
            flowPriority:newValue,
        })
    }

    onSubmit(){
        let flowInfo={
            name:this.state.name,
            flowDesc:this.state.flowDesc,
            seq:this.state.seq,
            jobCycle:this.state.jobCycle,
            jobCycleValue:this.state.jobCycleValue,
            flowPriority:this.state.flowPriority,
            startAt:this.state.startAt,
        }
        //TODO 表单验证

        if(this.state.id){
            flowInfo.id = this.state.id;
        }

        //提交信息
        _taskFlow.save(flowInfo).then(res=>{
            this.props.history.push('/task-flow/index');
        },errMsg=>{
            _mm.errorTips(errMsg)
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                {this.state.id ?
                    <PageTitle title="编辑任务流"/>: <PageTitle title="添加任务流"/>
                }

                <div className="form-horizontal">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务流名称(唯一)</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入流名称名称"
                                   name="name"
                                   value={this.state.name}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务流描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入流名称描述"
                                   name="flowDesc"
                                   value={this.state.flowDesc}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label  className="col-md-2 control-label">流名称顺序</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="顺序"
                                   name="seq"
                                   value={this.state.seq}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label  className="col-md-2 control-label">调度方式</label>
                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.jobCycle}
                                    onChange={(e) => this.onCycleSelect(e)}>
                                <option value="">请选择调度方式</option>
                                <option value="1">单次任务</option>
                                <option value="2">分钟任务</option>
                                <option value="3">小时任务</option>
                                <option value="4">天任务</option>
                                <option value="5">周任务</option>
                                <option value="6">月任务</option>
                            </select>
                        </div>
                    </div>


                    {
                        this.state.jobCycle != "1" ?
                            <div className="form-group">
                                <label  className="col-md-2 control-label">执行周期值</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                           placeholder="执行周期值"
                                           name="jobCycleValue"
                                           value={this.state.jobCycleValue}
                                           onChange={(e)=>this.onValueChange(e)}/>
                                </div>
                            </div>:""
                    }


                    <div className="form-group">
                        <label  className="col-md-2 control-label">优先级</label>

                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.flowPriority}
                                    onChange={(e) => this.onPrioritySelect(e)}>
                                <option value="">请选优先级</option>
                                <option value="1">高</option>
                                <option value="2">中</option>
                                <option value="3">低</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-group">
                        <label  className="col-md-2 control-label">开始时间</label>
                        <div className="col-md-5">
                            <Calendar
                                locale={cn ? zhCN : enUS}
                                style={{ zIndex: 1000 }}
                                dateInputPlaceholder="请选择日期"
                                format={this.getFormat(this.state.showTime)}
                                showDateInput={this.state.showDateInput}
                                onSelect={(value) =>{this.onStandaloneChange(value)}}
                            />
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

export default TaskFlowSave;
