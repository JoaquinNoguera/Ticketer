import React from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import withRequest from '../../utils/requestService';
import ProjectView from './project-view';
import ProjectSettings from './project-settings';



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
            ownerId: project.owner.id
        });
    }

    inLoading =  () => {
        this.setState({
            loading: true
        });
    }

    render(){

        const { tickets, owner, members, name, loading, ownerId } = this.state;

        if (loading) return <h1> Cargando... </h1>

        return(
            <Switch>
                
                <Route
                    exact path="/project/:projectId"
                >
                    <ProjectView
                        tickets = {tickets}
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
                        newUpdate = {this.newUpdate}
                        inLoading = {this.inLoading}
                    />
                </Route>

            </Switch>
        )
    }
}

export default withRequest(withRouter(ProjectManager));