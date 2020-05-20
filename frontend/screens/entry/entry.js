import React from 'react';
import {
    Redirect,
    Switch,
    Route
  } from "react-router-dom";
import Welcome from './welcome';
import Loggin from './loggin';
import SingIn from './sign-in';

import './style.scss';

export default function Entry ({ onLogIn, logedIn }) {

    if(logedIn) return <Redirect to="/projects"/>
    else
    return(
        <div id="entry">
                
                <Switch>
                    
                    <Route exact path ="/loggin">
                        
                        <Welcome/>
                        <Loggin 
                            onLogIn={ onLogIn } 
                        />
                    
                    </Route>
                    
                    <Route exact path ="/singin">

                        <Welcome/>
                        <SingIn 
                            onLogIn={ onLogIn } 
                        />
                        
                    </Route>

                </Switch>
        </div>
    );
}