import React from 'react';
import svg from './../../../components/logo'
import './style.scss';
import { withRouter } from "react-router";

function Welcome(props) {
    const { history } = props;

    function goLoggin() {
        history.push('/loggin')
    }


    function goSingIn() {
        history.push('/singin')
    }

    return (
        <div id="welcome">

            <h1 id="welcome__title">
                Bienvenido a TICKETER
            </h1>

            {svg}

            <button
                id="loggin__button"
                className={
                    (props.location.pathname === '/loggin') ?
                        ("welcome__button welcome__button--active") : ("welcome__button")
                }
                onClick={goLoggin}
            >
                Ingresar
            </button>

            <button
                id="singIn__button"
                className={
                    (props.location.pathname === '/singin') ?
                        ("welcome__button welcome__button--active") : ("welcome__button")
                }
                onClick={goSingIn}
            >
                Crear cuenta
            </button>
        </div>
    )
}

export default withRouter(Welcome);