import React from 'react';
import { Redirect } from 'react-router-dom';
import withRequest from '../../../utils/requestService'
import './style.scss';

class SingIn extends React.Component{
    
    state = {
            username: "",
            password: "",
            repeat: ""
        }

    handleInputChange = (event) => {
        let field = '';
        switch (event.target.id) {
            case 'login-input-username': field = 'username'; break;
            case 'login-input-password': field = 'password'; break;
            case 'login-input-repeat':   field = 'repeat'; break;
        }
        this.setState({ [field]: event.target.value });
    }
    
    handleFormSubmit = () => {
        const{username,password,repeat} = this.state;
        this.props.httpRequest('/api/singin', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                repeat: repeat,
            })
        })
        .then(user => this.props.onLogIn(user))
        .catch(_=> console.log('not singin in'));
    }

    render(){
        if (this.props.logedIn) return <Redirect to='projects' />
        const {username,password,repeat} = this.state
        return(
            <div className="singinContainer">
                <h2>Sing In into Tiketer</h2>
                <form
                    className="
                        singinForm
                    "
                    onSubmit={ (event) => { event.preventDefault(); this.handleFormSubmit() }}
                >
                    <span>Username</span>
                    <input 
                        id="login-input-username"
                        placeholder="pedrito matagatos"
                        className="
                            singinInput
                        "
                        onChange={ this.handleInputChange }
                        value={username}
                    />
                    
                    <span>Password</span>
                    <input 
                        id="login-input-password"
                        type="password" 
                        placeholder="********"
                        className="
                            singinInput
                        "
                        onChange={ this.handleInputChange }
                        value={password}
                    />
    
                    <span>Confirm Password</span>
                    <input 
                        id="login-input-repeat"
                        type="password" 
                        placeholder="********"
                        className="
                            singinInput
                        "
                        onChange={ this.handleInputChange }
                        value={repeat}
                    />
                    
                    <button 
                        type="submit"
                        className="
                            singinButton
                        "
                    >
                        Sing In
                    </button>
                </form>
            </div>
        );
    }
}

export default withRequest(SingIn);