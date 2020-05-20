import React from 'react';
import useInput from '../../../utils/useInput';
import withRequest from '../../../utils/requestService';

function SingIn (props){

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

    const [ error, setError ] = React.useState(initError);

    const [ username, usernameInput ] = useInput({
            init: "",
            placeholder:"Nombre de usuario",
            className: (error["name"].state) ? "entry--input warn" : "entry--input"    
    });
        
    const [ password, passwordInput ] = useInput({
            init: "",
            type:'password', 
            placeholder:"Contraseña",
            className: (error["password"].state) ? "entry--input warn" : "entry--input"
    });

    const [ passwordConfirm, passwordConfirmInput ] = useInput({
        init: "",
        type:"password", 
        placeholder:"Confirmar contraseña",
        className:"entry--input"
    });

    const handleFormSubmit = async() => {
        if (password === passwordConfirm) {
            props.httpRequest('/api/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            })
            .then(_ => {
                props.onLogIn(username);
            })
            .catch(props.errorHandler(err => {
                const newError = Object.assign({},initError);
                if (Array.isArray(err))
                    err.map(e => 
                        newError[e.field] = {
                            state: true,
                            message: e.message
                        }
                    );
                else
                    newError["generic"] = {
                        state: true,
                        message: err.message
                    }

                if(error != newError){
                    setError(newError)
                }
            }));
        } else
            setError(error => ({
                ...error,
                password: {
                    message: 'Las contraseñas no coinciden',
                    field: 'password'
                }
            }));
    }


        
    return(
        <div className="entry--container">
            <h2>Crear Cuenta</h2>
            
            <form
                onSubmit={ (event) => { event.preventDefault(); handleFormSubmit(); }}
            >
                
                <span
                    className="warn"
                > 
                    { error.generic.message }
                </span>

         
                {usernameInput}

                <span
                    className="warn"
                > 
                    { error.name.message } 
                </span>

      

                {passwordInput}
                
                <span
                    className="warn"
                > 
                    { error.password.message } 
                </span>
                
  
                {passwordConfirmInput}
                    
                <button 
                    className="primary"
                    type="submit"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}

export default withRequest(SingIn);