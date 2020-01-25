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
                    <Link to={`/proyect/${ this.props.match.params.proyectId }/settings`} ><button> Configurar (solo creador) </button></Link>
                    <Link to='/proyects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets></Tickets>

                <div id='proyect_view-add_ticket'> + </div>
            </div>
        );
    }
}

export default ProyectView;