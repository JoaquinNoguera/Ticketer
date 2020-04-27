import React from 'react';
import { Redirect } from 'react-router-dom';
import withRequest from '../../../utils/requestService'
import './style.scss';

class SingIn extends React.Component{
    
    state = {
            name: "",
            password: "",
            passwordConfirm: ""
        }

    handleInputChange = (event) => {
        let field = '';
        switch (event.target.id) {
            case 'login-input-name': field = 'name'; break;
            case 'login-input-password': field = 'password'; break;
            case 'login-input-password-confirm':   field = 'passwordConfirm'; break;
        }
        this.setState({ [field]: event.target.value });
    }
    
    handleFormSubmit = () => {
        const{ name, password, passwordConfirm } = this.state;

        if (password === passwordConfirm)
            this.props.httpRequest('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            })
            .then(_ => this.props.onLogIn({ name }))
            .catch(_=> console.log('not singin in'));
    }

    render(){
        if (this.props.logedIn) return <Redirect to='projects' />
        
        const { name ,password, passwordConfirm } = this.state;

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
                        id="login-input-name"
                        placeholder="pedrito matagatos"
                        className="
                            singinInput
                        "
                        onChange={ this.handleInputChange }
                        value={ name }
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
                        value={ password }
                    />
    
                    <span>Confirm Password</span>
                    <input 
                        id="login-input-password-confirm"
                        type="password" 
                        placeholder="********"
                        className="
                            singinInput
                        "
                        onChange={ this.handleInputChange }
                        value={ passwordConfirm }
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