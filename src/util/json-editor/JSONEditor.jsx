import React, {Component} from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import './index.css';

class JSONEditor extends Component {



  componentDidMount () {
    const options = {
      mode: 'code',
      onChangeJSON: this.props.onChangeJSON
    };

    this.jsoneditor = new JSONEditor(this.container, options);
    this.jsoneditor.set(this.props.json);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.jsoneditor.update(nextProps.json);
  }

  get=()=>{
	  console.log(JSON.stringify(this.jsoneditor.get()))
  };
  
  render() {
    return (
	<div>
        <div className="jsoneditor-react-container" ref={elem => this.container = elem} ></div>
		<div><button onClick={this.get}>get</button></div>
    </div>		
    );
  }
}

export default JSONEditor;