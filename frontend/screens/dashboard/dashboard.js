import React from 'react';
import Proyect from './proyect';
import CreateProyectModal from './create-proyect-modal';
import whitRequest from '../../utils/requestService';
import { onChangeState } from '../../utils/utils';
import Loading from '../../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

class Dashboard extends React.Component {

    state = {
        showCreateProyectModal: false,
        projects: [],
        loading: true,
        search: ''
    }

    componentDidMount() {
        this.props.httpRequest('/api/users/projects', {
            method: 'GET',
        })
            .then(projects => {
                this.setState({
                    projects: projects,
                    loading: false
                });
            })
            .catch(this.props.errorHandler(_ => {
                console.log('error in dashboad.js');
            }));
    }

    handleCreateProyectClick = () => {
        this.setState(state => ({ showCreateProyectModal: !state.showCreateProyectModal }));
    }

    handleCreateProyectCanceled = () => {
        this.setState({ showCreateProyectModal: false });
    }

    handleCreateProject = (projectName) => {

        this.setState({ showCreateProyectModal: false });

        this.props.httpRequest(
            '/api/users/projects',
            {
                method: 'POST',
                body: JSON.stringify({ projectName })
            })
            .then(project => {
                this.setState(state => ({
                    projects: [...state.projects, project]
                }));
            })
            .catch(_ => {
                console.log('error in dashboard.js');
            });
    }

    render() {

        const { projects, showCreateProyectModal, loading, search } = this.state;

        if(loading) return <Loading/>;

        const re = new RegExp(`(${search.toUpperCase()})`);

        const projectList = projects.map(project => {
            if (search === "" || project.name.toUpperCase().search(re) !== -1) {
                return <Proyect
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    owner={ project.owner } 
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
                        onClick={this.handleCreateProyectClick}>
                        <FontAwesomeIcon icon={faPlus} className='mr1' />
                        Crear proyecto
                    </button>

                    <input
                        value={search}
                        onChange={(e) => {
                            onChangeState.call(this, e, "search");
                        }}
                        placeholder='Escriba para buscar'
                    />
                </div>

                <CreateProyectModal
                    show={showCreateProyectModal}
                    onAccept={this.handleCreateProject}
                    onCancel={this.handleCreateProyectCanceled}
                />

                <div>
                    {projectList}
                </div>
            </div>
        );
    }
}

export default whitRequest(Dashboard);