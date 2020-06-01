import React from 'react';
import withRequest from '../../../utils/requestService';
import useInput from '../../../utils/useInput';
import { Link } from 'react-router-dom';
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


    const handleFormSubmit = () => {
        props.httpRequest('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        .then(_ => {
            props.onLogIn(username);
        })
        .catch(props.errorHandler(error => {
            const newError = Object.assign({}, initError);

            if (Array.isArray(error))
                error.map(e => 
                    newError[e.field] = {
                        state: true,
                        message: e.message
                    }
                );
            else 
                newError['generic'] = {
                    state: true,
                    message: error.message
                }

            if(error != newError){
                setError(newError)
            }
        }));
    }


    return (
        <div className="entry--container">
            <h2>Ingresar</h2>

            <form
                onSubmit={ event => { event.preventDefault(); handleFormSubmit(); }}
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
                <p
                    className="entry--link"
                >
                    ¿No tienes una cuenta?
                    <Link to="/singin"> Crear cuenta </Link>

                </p>
            </form>
        </div>
    );
}

export default withRequest(Loggin);