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

    
    const handleFormSubmit = async() => {
        try{
            if (password === passwordConfirm)
            await props.httpRequest('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });
            props.onLogIn(username);
        }catch(err){
            console.log('not singin in');
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
                    
                <span>
                    Username
                </span>
                {usernameInput}
                    
                <span>
                    Password
                </span>

                {passwordInput}
    
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