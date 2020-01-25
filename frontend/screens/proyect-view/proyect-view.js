import React from 'react';
import { Link } from 'react-router-dom';

import Tickets from './tickets';

import './styles.scss'

class ProyectView extends React.Component {

    render () {
        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <button> Configurar (solo creador) </button>
                    <Link to='/proyects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets></Tickets>

                <div id='proyect_view-add_ticket'> + </div>
            </div>
        );
    }
}

export default ProyectView;