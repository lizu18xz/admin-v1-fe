import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx';

import Home  from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import TaskList from "page/task/index.jsx";
import TaskSave from "page/task/save.jsx";
import TaskEditor from "page/task/editor.jsx";
import ActuatorList from "page/actuators/index.jsx";
import ActuatorSave from "page/actuators/save.jsx";
import TaskFlowList from "page/task-flow/index.jsx";
import TaskFlowListSave from "page/task-flow/save.jsx";
import TaskFlowTaskList from "page/task-flow/task/index.jsx"

import OperationList from "page/operation/index.jsx";
import LogPage from "page/operation/log.jsx";
import ErrorPage from "page/error/index.jsx";

class App extends React.Component{

    render() {
        return (
            <Router>
                <Switch>
                    <Route  path="/login" component={Login} />
                    <Route  path="/" render={ props => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/task/index" component={TaskList}/>
                                <Route path="/task/save/:type?" component={TaskSave}/>
                                <Route path="/task/editor/:id?" component={TaskEditor}/>
                                <Redirect exact from="/task" to="/task/index"/>

                                <Route path="/actuator/index" component={ActuatorList}/>
                                <Route path="/actuator/save/:id?" component={ActuatorSave}/>
                                <Redirect exact from="/actuator" to="/actuator/index"/>

                                <Route path="/task-flow/index" component={TaskFlowList}/>
                                <Route path="/task-flow/save/:id?" component={TaskFlowListSave}/>
                                <Route path="/task-flow/design/:id?" component={TaskFlowTaskList}/>
                                <Redirect exact from="/task-flow" to="/task-flow/index"/>

                                <Route path="/operation/index" component={OperationList}/>
                                <Route path="/operation/log/:logId?" component={LogPage}/>
                                <Redirect exact from="/operation" to="/operation/index"/>

                                <Route component={ErrorPage}/>
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);