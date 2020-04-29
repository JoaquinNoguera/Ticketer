import React from 'react';
import useInput from '../../utils/useInput';
import whitRequest from '../../utils/requestService';
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

    const changePassword = async() => {
        if(password === passwordConfirm){
            await httpRequest('/api/users', {
                method: 'PATCH',
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    password: password
                })
            });

        } else alert('las constraseñas no son iguales')
    }


    return(
        <div
            id="userSettings"
        >
            <h1>
                Cambiar Contraseña  
            </h1>

            {oldPasswordInput}

            {passwordInput}

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