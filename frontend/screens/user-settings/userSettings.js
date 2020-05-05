import React from 'react';
import useInput from '../../utils/useInput';
import whitRequest from '../../utils/requestService';
import {Link} from 'react-router-dom'
import './style.scss';

function UserSettings(props){

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
    
    const [oldPassword, oldPasswordInput] = useInput(
        {
            init: "",
            type:"password",
            placeholder:"Contraseña vieja",
            className: (error["oldPassword"].state) ? "input--error" : ""
            
        }
    )


    const [password, passwordInput] = useInput(
        {
            init: "",
            placeholder:"nueva contraseña",
            type:"password",
            className: (error["password"].state) ? "input--error" : ""
            
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
            <div
                id="userSettings-header"
            >
                <h2>
                    Configuración de usuario
                </h2>

                <Link 
                    to="/projects"
                >
                    <button>            
                        Volver
                    </button>
                </Link>
            </div>
            
            <div
                id="userSettings-form"
            >
                <h3>
                    Cambiar contraseña
                </h3>

                <span
                    className="input--span"
                > 
                    { error.generic.message } 
                </span>

                {oldPasswordInput}

                <span
                    className="input--span"
                > 
                    { error.oldPassword.message } 
                </span> 

                {passwordInput}

                <span
                    className="input--span"
                > 
                    { error.password.message } 
                </span>

                {passwordConfirmInput}
                
                <button
                    onClick={changePassword}
                >
                    Renombrar
                </button>
            </div>
        </div>
    )
}


export default whitRequest(UserSettings);