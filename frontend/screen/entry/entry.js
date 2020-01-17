import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
  } from "react-router-dom";
import Welcome from '../../component/welcome';
import Loggin from '../../component/loggin';
import SingIn from '../../component/singIn';
import './style.scss';

export default function Entry () {
    return(
        <div className="entry">
            <div className="entryContainer">
            <Router>
                <Switch>
                    <Route exact path ="/loggin">
                        <Welcome/>
                        <Loggin/>
                    </Route>
                    <Route exact path ="/singin">
                        <Welcome/>
                        <SingIn/>
                    </Route>
                </Switch>
            </Router>    
            </div>
        </div>
    )
}