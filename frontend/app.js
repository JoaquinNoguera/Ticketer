import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Switch,
    Route
} from 'react-router-dom';

import NavBar from './components/navbar';
import ProyectView from './screens/proyect-view';
import ProjectSettings from './screens/proyect-settings';
import Dashboard from './screens/dashboard';
import Entry from './screens/entry';

import './styles.scss'

class App extends React.Component {

    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path='/(loggin|singin)'>
                        <Entry></Entry>
                    </Route>
                    
                    <Route>
                        <NavBar></NavBar>
                        <Switch>
                            <Route exact path='/proyect/:proyectId' component={ ProyectView } />
                            <Route exact path='/proyects' component={ Dashboard } />
                            <Route exact path='/proyect/:proyectId/settings' component={ ProjectSettings } />
                            <Route path='/' component={ Entry } />
                        </Switch>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'));
