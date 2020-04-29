import React from 'react';
import withRequest from '../../../utils/requestService';
import useInput from '../../../utils/useInput';

import './style.scss';
import { Redirect } from 'react-router-dom';

function Loggin (props){
    

    const [username,usernameInput] = useInput(
        {
            init: "",
            placeholder:"pedrito matagatos",
            className: "logginInput"
        }
    );
    const [password,passwordInput] = useInput({
        init: "",
        type:"password", 
        placeholder:"********",
        className:"logginInput"
                        
    });
    

    const handleFormSubmit = async() => {
        try{
            await props.httpRequest('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });

            props.onLogIn(username);


        }catch(err){
            console.log('not loged in');
        }
    }

        if (props.logedIn) return <Redirect to='projects' />

        return(
            <div className="logginContainer">
                <h2>Loggin into Tiketer</h2>
    
                <form
                    className="logginForm"
                    onSubmit={ (event) => { event.preventDefault(); handleFormSubmit() }}
                >
                    <span>Username</span>
                    {
                        usernameInput
                    }
                    
                    <span>Password</span>
                    {
                        passwordInput
                    }
                    
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

export default withRequest(Loggin);