//搜索组件
import React from 'react';

class ListSearch extends React.Component{

    constructor(props){
        super(props);
        this.state={
            executorName:''//执行器名称
        }
    }


    onSearch(){
        console.log("查询")
        this.props.onSearch(this.state.executorName)
    }

    //选择执行器后的select事件
    onChangeValue(e){
        console.log("change")
        let name=e.target.name,
            value=e.target.value.trim();

        this.setState({
            [name]:value
        })

        this.onSearch();
    }


    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control select-items"
                                    name="executorType" onChange={(e)=>this.onChangeValue(e)}>
                                <option value="执行器名称1">执行器名称1</option>
                                <option value="执行器名称1">执行器名称2</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input  className="form-control"  placeholder="关键词"
                                    name="searchKeyword"/>
                        </div>

                        <button  className="btn btn-primary" onClick={(e)=>this.onSearch()}>查询</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default ListSearch;