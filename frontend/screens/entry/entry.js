import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Welcome from './welcome';
import Loggin from './loggin';
import SingIn from './sign-in';

import './style.scss';

export default function Entry () {
    return(
        <div className="entry">
            <div className="entryContainer">
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
            </div>
        </div>
    )
}