import React from 'react';

import PageTitle from 'component/page-title/index.jsx'
import JSONEditor from 'util/json-editor/index.jsx'

class Task extends React.Component{

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="任务编辑"/>

                <div className="row">

                    <JSONEditor/>

                </div>

            </div>
        );
    }
}

export default Task;
