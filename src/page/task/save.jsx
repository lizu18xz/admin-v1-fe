import React from 'react';
import './save.scss';
import PageTitle from 'component/page-title/index.jsx'
import JSONEditor from 'util/json-editor/index.jsx'
import MUtil from "util/mm.jsx";
import Task from 'service/task-service.jsx';
const _mm     =new MUtil();
const _task     =new Task();

class TaskSave extends React.Component{

    constructor(props){
        super(props)
        //定义任务信息
        this.state={
            jobGroup:'',
            cron:'',
            jobDesc:'',
            executorType:this.props.match.params.type,
            jobType:'',
            jobLoadBalance:'',
            jobHa:'',
            retries:'',
            startAt:'',
            jobConfig:'',
            text: JSON.stringify({}, null, 2),
        }

    }

    componentDidMount(){
        this.loadJobInfo();
    }

    //JSONEditor 编辑触发
    onChangeText (text) {
        this.setState({
            jobConfig:text
        })
    }

    loadJobInfo(){
        //TODO 当传jobId的时候说明是修改，需要展示job信息
    }

    //onValueChange 简单字段的改变
    onValueChange(e){
        let name=e.target.name,
            value=e.target.value.trim();
        this.setState({
            [name]:value
        })
    }

    onExecutorTypeChange(e){
        let newValue=e.target.value;
        this.setState({
            executorType:newValue,
        })
    }

    onJobTypeChange(e){
        let newValue=e.target.value;
        this.setState({
            jobType:newValue,
        })
    }

    onJobLoadBalance(e){
        let newValue=e.target.value;
        this.setState({
            jobLoadBalance:newValue,
        })
    }

    onJobHA(e){
        let newValue=e.target.value;
        this.setState({
            jobHa:newValue,
        })
    }

    onSubmit(){
        let jobInfo={
            jobGroup:this.state.jobGroup,
            cron:this.state.cron,
            jobDesc:this.state.jobDesc,
            executorType:this.state.executorType,
            jobType:this.state.jobType,
            jobLoadBalance:this.state.jobLoadBalance,
            jobHa:this.state.jobHa,
            retries:this.state.retries,
            startAt:this.state.startAt,
            jobConfig:this.state.jobConfig
            }
       //TODO 表单验证
       //提交信息
        _task.save(jobInfo).then((res)=>{
            _mm.successTips(res);
            this.props.history.push('/task/index');
        },(errMsg)=>{
            _mm.errorTips(errMsg);
        });
    }

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="添加任务"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入任务描述"
                                   name="jobDesc"
                                   value={this.state.jobDesc}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务执行周期Cron表达式</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入任务Cron表达式(/30 * * * * ? )"
                                   name="cron"
                                   value={this.state.cron}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">执行器类型</label>
                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.executorType}
                                    onChange={(e) => this.onExecutorTypeChange(e)}>
                                <option value={this.state.executorType}>{this.state.executorType}</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务类型</label>
                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.jobType}
                                    onChange={(e) => this.onJobTypeChange(e)}>
                                <option value="">请选择任务类型</option>
                                <option value="BEAN">BEAN</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务执行策略</label>
                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.jobLoadBalance}
                                    onChange={(e) => this.onJobLoadBalance(e)}>
                                <option value="">请选择执行策略</option>
                                <option value="1">HASH</option>
                                <option value="2">随机</option>
                                <option value="3">轮训</option>
                                <option value="4">权重</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">任务ha的策略</label>
                        <div className="col-md-10">
                            <select className="form-control save-selector"
                                    value={this.state.jobHa}
                                    onChange={(e) => this.onJobHA(e)}>
                                <option value="">请选择HA的策略</option>
                                <option value="1">failfast</option>
                                <option value="2">failover</option>
                            </select>
                        </div>
                    </div>

                    {
                        this.state.jobHa == "2" ?
                            <div className="form-group">
                                <label  className="col-md-2 control-label">重试次数</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                           placeholder="请输入重试次数,默认不重试"
                                           name="retries"
                                           value={this.state.retries}
                                           onChange={(e)=>this.onValueChange(e)}/>
                                </div>
                            </div>:""
                    }


                    <div className="form-group">
                        <label  className="col-md-2 control-label">第一次任务开始时间</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入第一次任务开始时间"
                                   name="startAt"
                                   value={this.state.startAt}
                                   onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                    </div>

                    {
                        this.state.executorType == "DATAX"?
                            <div className="form-group">
                                <label  className="col-md-2 control-label">JSON配置文件</label>
                                <div className="col-md-10">
                                    <JSONEditor
                                        text={this.state.text}
                                        onChangeText={(text) =>{this.onChangeText((text))}}
                                    />
                                </div>
                            </div>:''

                    }


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

export default TaskSave;
