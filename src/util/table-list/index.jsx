import React from 'react';

//通用表格
class TableList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            //第一次加载为true
            firstLoading:true
        }
    }

    //组件更新会触发
    componentWillReceiveProps(){
        this.setState({
            firstLoading:false
        })
    }

    render(){
        //表头
        let tableHeader=this.props.tableHeads.map((tableHead,index)=>{
            if(typeof tableHead === 'object'){
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            }else if(typeof tableHead === 'string'){
                return <th key={index}>{tableHead}</th>
            }
        });

        //列表内容
        let listBody=this.props.children;

        //列表信息
        let listInfo=(
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.firstLoading ? '正在加载数据...':'没有找到相应的结果'}
                </td>
            </tr>
        );

        let tableBody=listBody.length > 0 ? listBody:listInfo;

        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default table-list">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tableBody
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableList;