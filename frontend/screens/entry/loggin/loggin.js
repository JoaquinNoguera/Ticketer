import React from 'react';
import { Link } from 'react-router-dom';
import httpRequest from '../../../utils/requestService';

import './style.scss';


export default class Loggin extends React.Component {
    
    state = {
        username: '',
        password: ''
    }

    handleInputChange = (event) => {
        let field = '';
        switch (event.target.id) {
            case 'login-input-username': field = 'username'; break;
            case 'login-input-password': field = 'password'; break;
        }
        this.setState({ [field]: event.target.value });
    }

    handleFormSubmit = () => {
        httpRequest('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(_=> console.log('loged in'))
        .catch(_=> console.log('not loged in'));
    }

    render () {

        const { username, password } = this.state;

        return(
            <div className="logginContainer">
                <h2>Loggin into Tiketer</h2>
    
                <form
                    className="logginForm"
                    onSubmit={ (event) => { event.preventDefault(); this.handleFormSubmit() }}
                >
                    <span>Username</span>
                    <input 
                        id="login-input-username"
                        placeholder="pedrito matagatos"
                        className="logginInput"
                        onChange={ this.handleInputChange }
                        value={ username }
                    />
                    
                    <span>Password</span>
                    <input 
                        id="login-input-password"
                        type="password" 
                        placeholder="********"
                        className="logginInput"
                        onChange={ this.handleInputChange }
                        value={ password }
                    />
                    
                    <button 
                        type="submit"
                        className="logginButton"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}