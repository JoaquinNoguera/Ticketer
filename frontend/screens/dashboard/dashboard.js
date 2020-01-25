import React from 'react';
import Proyect from './proyect';
import CreateProyectModal from './create-proyect-modal';

import './styles.scss';

class Dashboard extends React.Component {
    state = {
        proyects: [
            { id: 1, name: 'Tu puta madre' },
            { id: 3, name: 'Tu puta madre re entangada' },
            { id: 67, name: 'El nuevo Facebook' },
            { id: 101, name: 'Dominacion mundial' }
        ],
        showCreateProyectModal: false
    }

    handleCreateProyectClick = () => {
        this.setState(state => ({ showCreateProyectModal: !state.showCreateProyectModal }));
    }

    handleCreateProyectCanceled = () => {
        this.setState({ showCreateProyectModal: false });
    }

    render () {
        const { proyects, showCreateProyectModal } = this.state;

        return (
            <div id='dashboard' >
                <h2> Proyectos </h2>

                <div id="dashboard-actions">
                    <button id='dashboard-create-proyect' onClick={ this.handleCreateProyectClick }> + Crear proyecto </button>
                </div>

                <CreateProyectModal 
                show={ showCreateProyectModal } 
                onAccept={ this.handleCreateProyectCanceled } 
                onCancel={ this.handleCreateProyectCanceled } 
                />

                <div>
                    { proyects.map(proyect => (
                        <Proyect
                            key={ proyect.id }
                            id={ proyect.id }
                            name={ proyect.name }
                        />
                    )) }
                </div>
            </div>
        );
    }
}

export default Dashboard;