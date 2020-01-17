import React from 'react';

import Tickets from './tickets';

import './styles.scss'

class ProyectView extends React.Component {

    render () {
        return (
            <div>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <button> Configurar (solo creador) </button>
                    <button> Volver al dashboard </button>
                </div>

                <Tickets></Tickets>

                <div id='proyect_view-add_ticket'> + </div>
            </div>
        );
    }
}

export default ProyectView;