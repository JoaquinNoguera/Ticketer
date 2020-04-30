import React from 'react';
import useInput from '../../utils/useInput';
import whitRequest from '../../utils/requestService';
import {Link} from 'react-router-dom'
import './style.scss';

function UserSettings(props){


    
    const [oldPassword, oldPasswordInput] = useInput(
        {
            init: "",
            type:"password",
            placeholder:"Contraseña vieja"
            
        }
    )


    const [password, passwordInput] = useInput(
        {
            init: "",
            placeholder:"nueva contraseña",
            type:"password"
            
        }
    )

    const [passwordConfirm, passwordConfirmInput] = useInput(
        {
            init: "",
            placeholder:"repetir contraseña",
            type:"password"
            
        }
    )

    const {httpRequest} = props;
    
    const initError = {
        oldPassword: {
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


    const changePassword = async() => {
        try{
            if(password === passwordConfirm){
            await httpRequest('/api/users', {
                method: 'PATCH',
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    password: password
                })
            });

        } else {
            throw [{
                message: "las contraseñas no coinciden",
                field: "password"
            }]
        } } catch(err){
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


    return(
        <div
            id="userSettings"
        >
            <h1>
                Cambiar Contraseña  
            </h1>

            <Link 
                to="/projects"
            >
                <button>            
                    Volver al dashboard
                </button>
            </Link>

            { error.generic.state &&  <span> { error.generic.message } </span> }

            {oldPasswordInput}

            { error.oldPassword.state &&  <span> { error.oldPassword.message } </span> }

            {passwordInput}

            { error.password.state &&  <span> { error.password.message } </span> }

            {passwordConfirmInput}
            
            <button
                onClick={changePassword}
            >
                Cambiar Contraseña
            </button>
        </div>
    )
}


export default whitRequest(UserSettings);