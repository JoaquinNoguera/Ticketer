import "@babel/polyfill";

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
import ProtectedRoute from './components/protected-route';

import './styles.scss'

class App extends React.Component {

    state = {
        logedIn: false,
    }

    constructor (props) {
        super(props);

        window.on401 = this.handle401;
    }

    handle401 = () => {
        console.log('No hay autentificado');
        this.setState({ logedIn: false });
    }

    handleLogIn = (user) => {
        console.log(`user ${ user.name } loged in`);
        this.setState({ logedIn: true });
    }

    handleLogOut = () => {
        this.setState({ logedIn: false });
    }

    render () {
        const { logedIn } = this.state;

        return (
            <Router>
                <Switch>
                    <Route exact path='/(login|singin)'>
                        <Entry 
                            logedIn={ logedIn }
                            onLogIn={ this.handleLogIn }
                        />
                    </Route>
                    
                    <ProtectedRoute
                        logedIn={ logedIn }
                    >
                        <NavBar
                            onLogOut={ this.handleLogOut }
                        />
                        <Switch>
                            <Route
                                exact 
                                path='/project/:projectId'
                            >
                                <ProyectView />
                            </Route>

                            <Route
                                exact 
                                path='/projects'
                            >
                                <Dashboard />
                            </Route>

                            <Route
                                exact 
                                path='/project/:projectId/settings'
                            >
                                <ProjectSettings />
                            </Route>
                        </Switch>
                    </ProtectedRoute>

                    <Route path='/' component={ Entry } />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-root'));
