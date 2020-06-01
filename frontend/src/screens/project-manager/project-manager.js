import React from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import withRequest from '../../utils/requestService';
import ProjectView from './project-view';
import ProjectSettings from './project-settings';
import ProjectContext from './project-context';
import Loading from '../../components/Loading';

class ProjectManager extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            tickets: [
            ],
            owner: false,
            members: [],
            name: "",
            loading: true,
            ownerId: null,
            projectId: null
        }
    }

    componentDidMount() {
        this.init();
    }

    init = async () =>{
        
        this.props.httpRequest(
            `/api/projects/${ this.props.match.params.projectId }`, 
            { method: 'GET' }
        )
        .then(project => {
            this.newUpdate(project);
        })
        .catch(this.props.errorHandler(err => {
            console.log('error in project-manager.js');
        }));
    }

    newUpdate = (project) => {
        const { name } = this.props;
        console.log(project, name);
        this.setState({
            tickets: project.tickets,
            owner: (project.owner.name === name),
            name: project.name,
            members: project.members,
            loading: false,
            ownerId: project.owner.id,
            projectId: project.id,
            userName: name
        });
    }

    inLoading =  () => {
        this.setState({
            loading: true
        });
    }

    handleTicketDeleted = async (ticketId) => {
        const { projectId } = this.state;

        return this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
        {
            method: 'DELETE'
        })
        .then(_ => {
            this.setState(
                ({ tickets }) => (
                    { 
                        tickets: tickets.filter(
                            ticket => ticket.id !== ticketId )
                    }
                )
            );
        })
        .catch(this.props.errorHandler(error => { throw error }));
    }
 
    handleTicketCreated = async (header, body) => {
        const { projectId } = this.state;
        if( !body ) body = "";
        return this.props.httpRequest(`/api/projects/${ projectId }/tickets`,
            {
                method: 'POST',
                body: JSON.stringify({
                    header: header,
                    body:  body
                })
            }
        )
        .then(ticket => {
            this.setState(({ tickets }) => ({
                tickets: [ ...tickets, ticket ]
            }));
        })
        .catch(this.props.errorHandler(error => { throw error }));
    }

    handleTicketAction = async (ticketId, action) => {
        const { projectId } = this.state;
        
        return this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    action
                })
            }
        )
        .then(updatedTicket => {
            this.setState(
                ({ tickets }) => (
                    { 
                        tickets: tickets.map(
                            ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket )
                    })
            );
        })
        .catch(this.props.errorHandler(error => { throw error }));
    }

    handleUpdateTicket = async (ticketId, header, body) => {

        const { projectId } = this.state;
        if( !body ) body = "";
        return this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action: 'CHANGE',
                value: {
                    header,
                    body
                }
            })
        })
        .then(updatedTicket => {
            this.setState(({ tickets }) => ({
                tickets: tickets.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket)
            }));
        })
        .catch(this.props.errorHandler(error => { throw error }));
    }
 

    render(){

        const { tickets, owner, members, name, loading, ownerId, projectId, userName } = this.state;

        if (loading) return <Loading/>
        else{
        return(
            <ProjectContext.Provider
                value = {{
                    inLoading: this.inLoading,
                    newUpdate: this.newUpdate,
                    handleTicketCreated: this.handleTicketCreated,
                    handleTicketDeleted: this.handleTicketDeleted,
                    handleTicketAction: this.handleTicketAction,
                    handleUpdateTicket: this.handleUpdateTicket,
                    tickets: tickets,
                    projectId: projectId,
                    projectName: name,
                    userName: userName,
                }}
            >
                <Switch>
                    
                    <Route
                        exact path="/project/:projectId"
                    >
                        <ProjectView
                            owner = {owner}
                        />
                    </Route>

                    <Route
                    exact path="/project/:projectId/settings"
                    >
                        <ProjectSettings
                            owner = {owner}
                            name= {name}
                            members = {members}
                            ownerId = {ownerId}
                        />
                    </Route>

                </Switch>
            </ProjectContext.Provider>
        )}
    }
}

export default withRequest(withRouter(ProjectManager));