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

    const initError = {
        name: {
            state: false,
            message: null
        },
        password: {
            state: false,
            message: null
        },
        generic: {
            state: false,
            message: null,
        }
    };

    const [error,setError] = React.useState(initError);
    

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
            const newError = Object.assign({},initError);
            if(Array.isArray(err)){
                err.map(e => 
                    newError[e.field] = {
                        state: true,
                        message: e.message
                    }
                );
            }else{
                newError["generic"] = {
                    state: true,
                    message: err.message
                }
            }
            if(error != newError){
                setError(newError)
            }
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

                    { error.generic.state &&  <span> { error.generic.message } </span> }

                    <span>Username</span>
                    
                    { usernameInput }

                    { error.name.state &&  <span> { error.name.message } </span> }                    
                    
                    <span>Password</span>
                    
                    { passwordInput }
                    
                    { error.password.state &&  <span> { error.password.message } </span> }

                    <button 
                        type="submit"
                        className="logginButton primary"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
}

export default withRequest(Loggin);