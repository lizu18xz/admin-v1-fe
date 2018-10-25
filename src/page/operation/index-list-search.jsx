//搜索组件
import React from 'react';

class ListSearch extends React.Component{

    constructor(props){
        super(props);
        this.state={
            remoteIp:'',
            jobDesc:''
        }
    }


    onSearch(){
        this.props.onSearch(this.state.remoteIp,this.state.jobDesc)
    }


    onInputChange(e){
        let inputValue=e.target.value,
            inputName=e.target.name;
        this.setState({
            [inputName]:inputValue
        })
    }


    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">

                        <div className="form-group">
                            <input  className="form-control"  placeholder="任务名称"
                                    name="jobDesc"
                                    onChange={e=>this.onInputChange(e)}/>


                            <input  className="form-control"  placeholder="执行机器"
                                    name="remoteIp"
                                    onChange={e=>this.onInputChange(e)}/>

                        </div>
                        <button  className="btn btn-primary" onClick={(e)=>this.onSearch()}>查询</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default ListSearch;