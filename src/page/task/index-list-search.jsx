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
        console.log("查询"+this.state.executorName)

        this.props.onSearch(this.state.executorName)
    }

    //选择执行器后的select事件
    onChangeValue(e){
        let name=e.target.name,
            value=e.target.value.trim();

        this.setState({
            [name]:value
        },e=>{
           this.onSearch();
        })
    }

    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control select-items"
                                    name="executorName" onChange={(e)=>this.onChangeValue(e)}>
                                <option  value="">全部</option>
                                {
                                    this.props.selectContent.map((selects,index)=>{
                                        return(
                                            <option key={index} value={selects.name} >{selects.name}</option>
                                        );
                                    })
                                }
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