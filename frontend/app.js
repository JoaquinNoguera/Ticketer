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


import './styles.scss'

class App extends React.Component {

    state = {
        logedIn: false,
        username: null,
    }

    constructor (props) {
        super(props);
        window.on401 = this.handle401;
    }

    componentDidMount(){
        this.init();
    }

    init = async () => {
        const {httpRequest} = this.props;
        try{
            const response = await httpRequest('/api/authentication',{
                method: 'GET'
            });
            this.setState({
                username: response.name,
                logedIn: true
            })
        }catch(err){
            console.log(err);
        }

    }


    handle401 = () => {
        console.log('No está autentificado');
        this.setState({ logedIn: false });
    }

    handleLogIn = (username) => {
        console.log(`user ${ username } loged in`);
        this.setState({ 
            logedIn: true,
            username: username
        });
    }

    handleLogOut = () => {
        Cookies.remove("token",{
            path:"/",
        });
        this.setState({ logedIn: false });
    }

    render () {
        const { logedIn, username } = this.state;

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
                                path="/user/setting"
                            >
                                <UserSettings/>
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
                                    name ={username}
                                />
                            </Route>

                        </Switch>
                    </ProtectedRoute>

                    <Route path='/' component={ Entry } />
                </Switch>
            </Router>
        );
    }
}


const WrapperApp = withRequest(App)

ReactDOM.render(<WrapperApp/>, document.getElementById('app-root'));
