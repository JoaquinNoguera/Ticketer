import React from 'react';
import useInput from '../../utils/useInput';
import whitRequest from '../../utils/requestService';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faPen } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

function UserSettings(props) {

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

    const [error, setError] = React.useState(initError);

    const [oldPassword, oldPasswordInput] = useInput(
        {
            init: "",
            type: "password",
            placeholder: "Contraseña vieja",
            className: (error["oldPassword"].state) ? "warn" : ""

        }
    )


    const [password, passwordInput] = useInput(
        {
            init: "",
            placeholder: "Nueva contraseña",
            type: "password",
            className: (error["password"].state) ? "warn" : ""

        }
    )

    const [passwordConfirm, passwordConfirmInput] = useInput(
        {
            init: "",
            placeholder: "Repetir contraseña",
            type: "password"

        }
    )

    const { httpRequest } = props;

    
    const [changeMessage, setChangeMessage] = React.useState(false);


    const changePassword = async () => {
        try {
            if (password === passwordConfirm) {
                await httpRequest('/api/users', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        oldPassword: oldPassword,
                        password: password
                    })
                });
                setChangeMessage("La contraseña ha sido cambiada exitosamente");
            } else {
                throw [{
                    message: "las contraseñas no coinciden",
                    field: "password"
                }]
            }
        } catch (err) {
            const newError = Object.assign({}, initError);
            if (Array.isArray(err)) {
                err.map(e =>
                    newError[e.field] = {
                        state: true,
                        message: e.message
                    }
                );
            } else {
                newError["generic"] = {
                    state: true,
                    message: err.message
                }
            }
            if (error != newError) {
                setError(newError)
            }
        }
    }


    return (
        <div
            id="userSettings"
        >

            <h2>
                Configuración de usuario
            </h2>

            <div
                id="userSettings-actions"
            >
                <Link
                    to="/projects"
                >
                    <button
                        className="secondary"
                    >
                        <FontAwesomeIcon icon={faArrowCircleLeft} className='mr1' />
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
                    className="warn"
                >
                    {error.generic.message}
                </span>

                {oldPasswordInput}

                <span
                    className="warn"
                >
                    {error.oldPassword.message}
                </span>

                {passwordInput}

                <span
                    className="warn"
                >
                    {error.password.message}
                </span>

                {passwordConfirmInput}
                
                
                <button
                    className="primary"
                    onClick={changePassword}
                >
                    <FontAwesomeIcon icon={faPen} className='mr1' />
                    Cambiar contraseña
                </button>

                <span
                    className="successful"
                >
                    {changeMessage}
                </span>

            </div>
        </div>
    )
}


export default whitRequest(UserSettings);