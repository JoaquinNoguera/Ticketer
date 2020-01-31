import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Tickets from './tickets';

import './styles.scss'

class ProyectView extends React.Component {

    render () {
        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <Link to={`/project/${ this.props.match.params.projectId }/settings`} ><button> Configurar (solo creador) </button></Link>
                    <Link to='/projects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets></Tickets>

                <div id='proyect_view-add_ticket'> + </div>
            </div>
        );
    }
}

export default withRouter(ProyectView);