import React from 'react';
import useInput from '../../../utils/useInput';
import { Redirect } from 'react-router-dom';
import withRequest from '../../../utils/requestService';
import './style.scss';

function SingIn (props){

    const [username,usernameInput] = useInput(
        {
            init: "",
            placeholder:"pedrito matagatos",
            className: "singinInput"
        }
    );
        
    const [password,passwordInput] = useInput({
            init: "",
            type:"password", 
            placeholder:"********",
            className:"singinInput"
                            
    });

    const [passwordConfirm,passwordConfirmInput] = useInput({
        init: "",
        type:"password", 
        placeholder:"********",
        className:"singinInput"
                        
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
            if (password === passwordConfirm){
            await props.httpRequest('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });
            props.onLogIn(username);
            }else{
                throw [{
                    message: "las contraseñas no coinciden",
                    field: "password"
                }]
            }
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
        <div className="singinContainer">
            <h2>Sing In into Tiketer</h2>
            
            <form
                className="singinForm"
                onSubmit={ (event) => { event.preventDefault(); handleFormSubmit() }}
            >
                
                { error.generic.state &&  <span> { error.generic.message } </span> }

                <span>
                    Username
                </span>
                {usernameInput}

                { error.name.state &&  <span> { error.name.message } </span> }

                <span>
                    Password
                </span>

                {passwordInput}
                
                { error.password.state &&  <span> { error.password.message } </span> }
                
                <span>
                    Confirm Password
                </span>
                   
                {passwordConfirmInput}
                    
                <button 
                    type="submit"
                    className="singinButton"
                >
                    Sing In
                </button>
            </form>
        </div>
    );
}

export default withRequest(SingIn);