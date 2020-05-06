import React from 'react';
import Proyect from './proyect';
import CreateProyectModal from './create-proyect-modal';
import whitRequest from '../../utils/requestService';
import { onChangeState } from '../../utils/utils';

import './styles.scss';

class Dashboard extends React.Component {
    
    state = {
        showCreateProyectModal: false,
        projects: [],
        loading: true,
        search: ''
    }

    componentDidMount(){
        this.init();
    }

    init = async () => {
        try{
            const projects = await this.props.httpRequest('/api/users/projects', {
                                                        method: 'GET',
                                                    });
            this.setState({
                projects: projects,
                loading: false
                        });

        }catch(err){
            console('error');
        }
    }


    handleCreateProyectClick = () => {
        this.setState(state => ({ showCreateProyectModal: !state.showCreateProyectModal }));
    }

    handleCreateProyectCanceled = () => {
        this.setState({ showCreateProyectModal: false });
    }

    handleCreateProject = async (projectName) => {
        
        try{
            this.setState({ showCreateProyectModal: false });
        
            const project = await this.props.httpRequest(
                                        '/api/users/projects', {
                                                    method: 'POST',
                                                    body: JSON.stringify({ projectName })
                                                });
            this.setState(state => ({
                projects: [ ...state.projects, project ]
            }));
            
        }catch(er){
            console.log('error');
        }
    }

    render () {
        const { projects, showCreateProyectModal, loading, search } = this.state;

        if(loading) return <h1>Cargando</h1>;


        const re = new RegExp(`(${search.toUpperCase()})`);

        const projectList = projects.map(project => {
            if(search === "" || project.name.toUpperCase().search(re) !== -1){
                return <Proyect
                            key={ project.id }
                            id={ project.id }
                            name={ project.name }
                        />
            }
        }); 

        return (
            <div id='dashboard' >
                <h2> Proyectos </h2>

                <div id="dashboard-actions">
                    <button 
                    id='dashboard-create-proyect'
                    className='secondary'
                    onClick={ this.handleCreateProyectClick }>
                        + Crear proyecto 
                    </button>

                    <input 
                        value={search}
                        onChange={(e) => {
                                onChangeState.call(this,e,"search");
                        }}
                        placeholder='Escriba para buscar'
                    />
                </div>

                <CreateProyectModal 
                show={ showCreateProyectModal } 
                onAccept={ this.handleCreateProject } 
                onCancel={ this.handleCreateProyectCanceled } 
                />

                <div>
                    {  projectList }
                </div>
            </div>
        );
    }
}

export default whitRequest(Dashboard);