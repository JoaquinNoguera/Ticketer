import React from 'react';
import Proyect from './proyect';
import CreateProyectModal from './create-proyect-modal';
import whitRequest from '../../utils/requestService';

import './styles.scss';

class Dashboard extends React.Component {
    
    state = {
        showCreateProyectModal: false,
        projects: []
    }

    componentDidMount(){
        this.props.httpRequest('/api/projects', {
            method: 'GET',
        })
        .then(projects => this.setState({
            projects: projects
        }))
        .catch(_=> console.log('error'));
    }

    handleCreateProyectClick = () => {
        this.setState(state => ({ showCreateProyectModal: !state.showCreateProyectModal }));
    }

    handleCreateProyectCanceled = () => {
        this.setState({ showCreateProyectModal: false });
    }

    render () {
        const { projects, showCreateProyectModal } = this.state;

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
                    { projects.map(project => (
                        <Proyect
                            key={ project.id }
                            id={ project.id }
                            name={ project.name }
                        />
                    )) }
                </div>
            </div>
        );
    }
}

export default whitRequest(Dashboard);