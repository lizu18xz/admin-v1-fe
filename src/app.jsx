import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx';

import Home  from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import TaskList from "page/task/index.jsx";
import TaskSave from "page/task/save.jsx";
import ActuatorList from "page/actuators/index.jsx";
import ActuatorSave from "page/actuators/save.jsx";
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
                                <Redirect exact from="/task" to="/task/index"/>
                                <Route path="/actuator/index" component={ActuatorList}/>
                                <Route path="/actuator/save" component={ActuatorSave}/>
                                <Redirect exact from="/actuator" to="/actuator/index"/>
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