import "@babel/polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import NavBar from './components/navbar';
import ProjectManager from './screens/project-manager';
import Dashboard from './screens/dashboard';
import Entry from './screens/entry';
import UserSettings from './screens/user-settings';
import ProtectedRoute from './components/protected-route';
import withRequest from './utils/requestService';
import Cookies from 'js-cookie';
import Loading from './components/Loading';
import NotFound from './screens/not-found';

import './styles.scss'

class App extends React.Component {

    state = {
        awaitingAuthResponse: true,
        logedIn: false,
        username: null,
    }

    constructor(props) {
        super(props);
        window.on401 = this.handle401;
    }

    componentDidMount() {
        const { httpRequest } = this.props;
        httpRequest('/api/authentication', {
            method: 'GET'
        })
            .then(
                response => this.setState({
                    username: response.name,
                    logedIn: true,
                    awaitingAuthResponse: false
                }))
            .catch(_ => {
                this.setState({ awaitingAuthResponse: false });
            });
    }


    handle401 = () => {
        console.log('No está autentificado');
        this.setState({ logedIn: false });
    }

    handleLogIn = (username) => {
        console.log(`user ${username} loged in`);
        this.setState({
            logedIn: true,
            username: username
        });
    }

    handleLogOut = () => {
        Cookies.remove("token", {
            path: "/",
        });
        this.setState({ logedIn: false });
    }

    render() {
        const { logedIn, username, awaitingAuthResponse } = this.state;

        if (awaitingAuthResponse) {
            return <Loading/>;;
        }
        else
        return (
            <Router>
                <Switch>
                    <Route exact path='/(loggin|singin)'>
                        <Entry
                            logedIn={logedIn}
                            onLogIn={this.handleLogIn}
                        />
                    </Route>

                    <ProtectedRoute
                        logedIn={logedIn}
                    >
                        <NavBar
                            onLogOut={this.handleLogOut}
                            username={ username }
                        />
                        <Switch>

                            <Route
                                exact
                                path="/user/setting"
                            >
                                <UserSettings />
                            </Route>

                            <Route
                                exact
                                path='/projects'
                            >
                                <Dashboard />
                            </Route>

                            <Route
                                path='/project/:projectId'
                            >
                                <ProjectManager
                                    name={username}
                                />
                            </Route>
                            <Route component={NotFound}/>

                        </Switch>
                    </ProtectedRoute>

                    <Route path='/' component={Entry} />
                </Switch>
            </Router>
        );
    }
}


const WrapperApp = withRequest(App)

ReactDOM.render(<WrapperApp />, document.getElementById('app-root'));
