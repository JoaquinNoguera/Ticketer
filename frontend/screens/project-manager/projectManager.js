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
            memebers: [],
            name: "",
            loading: true
        }
    }

    componentDidMount(){
        this.init();
    }


    init = async () =>{
        const {name} = this.props;
        try{

            const project = await this.props.httpRequest(`/api/projects/${ this.props.match.params.projectId }`, {
                method: 'GET',
            });

            this.setState({
                tickets: project.tickets,
                owner: (project.owner.name === name),
                name: project.name,
                memebers: project.memebers,
                loading: false
            });

            console.log(project)


        }catch(err){
            console.log('error')
        }
    }

    render(){
        const {tickets, owner, memebers, name, loading} = this.state;
        if(loading) return <h1>Cargando ...</h1>
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
                        memebers = {memebers}
                    />
                </Route>


            </Switch>
        )
    }
}

export default withRequest(withRouter(ProjectManager));