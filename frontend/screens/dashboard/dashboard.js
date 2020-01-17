import React from 'react';
import Proyect from './proyect';

import './styles.scss';

class Dashboard extends React.Component {

    render () {
        return (
            <div>
                <h1> Proyectos </h1>

                <div id="dashboard-actions"><button id='dashboard-create-proyect'> + Crear proyecto </button></div>

                <div>
                    <Proyect name='Big Bertha' />
                    <Proyect name='kuklux' />
                    <Proyect name='GTA 8' />
                    <Proyect name='Proyect #4' />
                </div>
            </div>
        );
    }
}

export default Dashboard;