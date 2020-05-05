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

export default function Entry ({ onLogIn, logedIn }) {
    return(
        <div id="entry">
                
                <Switch>
                    
                    <Route exact path ="/loggin">
                        
                        <Welcome/>
                        <Loggin 
                            onLogIn={ onLogIn } 
                            logedIn={ logedIn } 
                        />
                    
                    </Route>
                    
                    <Route exact path ="/singin">

                        <Welcome/>
                        <SingIn 
                            onLogIn={ onLogIn } 
                            logedIn={ logedIn }
                        />
                        
                    </Route>

                </Switch>
        </div>
    )
}