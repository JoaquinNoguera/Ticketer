import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default function () {
    return <div id="not-found">
                <h1>404</h1>
                <p>
                    Lo sentimos, la página que ha solicitado no ha sido encontrada.
                </p>
                <p>
                    Puede clickear el siguente bóton para volver al 
                    <Link to="/projects"> inicio </Link>
                </p>
            </div>;
}