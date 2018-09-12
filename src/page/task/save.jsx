import React from 'react';

import PageTitle from 'component/page-title/index.jsx'
import JSONEditor from 'util/json-editor/index.jsx'

class TaskSave extends React.Component{

    render() {
        return (
            <div id="page-wrapper">

                <PageTitle title="添加任务"/>

                <div className="row">

                    <JSONEditor/>

                </div>

            </div>
        );
    }
}

export default TaskSave;
