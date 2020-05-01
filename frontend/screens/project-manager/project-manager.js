import React from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import withRequest from '../../utils/requestService';
import ProjectView from './project-view';
import ProjectSettings from './project-settings';
import ProjectContext from './project-context';

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
        try {
            const project = await this.props.httpRequest(
                `/api/projects/${ this.props.match.params.projectId }`, 
                { method: 'GET' }
            );

            this.newUpdate(project);

        } catch(err) {
            console.log('error');
        }
    }

    newUpdate = (project) => {
        const { name } = this.props;

        this.setState({
            tickets: project.tickets,
            owner: (project.owner.name === name),
            name: project.name,
            members: project.members,
            loading: false,
            ownerId: project.owner.id,
            projectId: project.id,
        });
    }

    inLoading =  () => {
        this.setState({
            loading: true
        });
    }

    handleTicketDeleted = async (ticketId) => {
        const { projectId } = this.state;

        await this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
        {
            method: 'DELETE'
        });
        
        this.setState(
            ({ tickets }) => (
                { 
                    tickets: tickets.filter(
                        ticket => ticket.id !== ticketId )
                }
            )
        );
    }
 
    handleTicketCreated = async (header, body) => {
        const { projectId } = this.state;
        
        console.log(header, body);

        const ticket = await this.props.httpRequest(`/api/projects/${ projectId }/tickets`,
            {
                method: 'POST',
                body: JSON.stringify({
                    header: header,
                    body:  body
                })
            }
        );

        this.setState(({ tickets }) => ({
            tickets: [ ...tickets, ticket ]
        }));
    }

    handleTicketAction = async (ticketId, action) => {
        const { projectId } = this.state;
        
        const updatedTicket = await this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    action
                })
            }
        );

        this.setState(
            ({ tickets }) => (
                { 
                    tickets: tickets.map(
                        ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket )
                })
        );
    }

    handleUpdateTicket = async (ticketId, header, body) => {

        const { projectId } = this.state;

        const updatedTicket = await this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ ticketId }`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action: 'CHANGE',
                value: {
                    header,
                    body
                }
            })
        });

        this.setState(({ tickets }) => ({
            tickets: tickets.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket)
        }));
    }
 

    render(){

        const { tickets, owner, members, name, loading, ownerId, projectId } = this.state;

        if (loading) return <h1> Cargando... </h1>

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
                    projectId: projectId
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
        )
    }
}

export default withRequest(withRouter(ProjectManager));