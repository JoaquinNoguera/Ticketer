import React from 'react';
import withRequest from '../../../utils/requestService';
import useInput from '../../../utils/useInput';
import { Redirect } from 'react-router-dom';

function Loggin (props){
    
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
    
    const [username,usernameInput] = useInput(
        {
            init: "",
            placeholder:"Nombre de usuario",
            className: (error["name"].state) ? "entry--input warn" : "entry--input",
        }
    );
    const [password,passwordInput] = useInput({
        init: "",
        type:"password", 
        placeholder:"Contraseña",
        className: (error["password"].state) ? "entry--input warn" : "entry--input"
                        
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
            <div className="entry--container">
                <h2>Ingresar</h2>
    
                <form
                    onSubmit={ (event) => { event.preventDefault(); handleFormSubmit() }}
                >

                  
                    <span
                        className="warn"
                    > 
                        { error.generic.message }
                    </span> 
                    

                    
                    { usernameInput }

                    <span
                        className="warn"
                    > 
                        { error.name.message }
                    </span> 
                                        
                    
                    
                    { passwordInput }
                    
                   
                    <span
                        className="warn"
                    > 
                        { error.password.message } 
                    </span> 
                    

                    <button 
                        className="primary"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        );
}

export default withRequest(Loggin);