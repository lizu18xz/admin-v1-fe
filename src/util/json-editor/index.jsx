import React from 'react';

import  JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './index.scss';
const options = {
    mode: 'code'
};
class JsonEditor extends React.Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount () {
      this.jsoneditor = new JSONEditor(this.container, options);
    }

    componentWillUnmount () {
      if (this.jsoneditor) {
      this.jsoneditor.destroy();
      }
  }

     get(){
        console.log(JSON.stringify(this.jsoneditor.get()));
     }

     render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    JSON编辑器
                </div>
                <div className="panel-body">
                    <div className="jsoneditor-react-container" ref={elem => this.container = elem} ></div>
                    <div><button  onClick={()=>this.get()}>保存</button></div>
                </div>
                <div className="panel-footer">
                    提交前请确认编辑器右下角没有<span className="warning">红色X号</span>,若存在请检查配置！！！
                </div>
            </div>
        );

     }
}

export default JsonEditor;