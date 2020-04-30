import React from 'react';
import './style.scss';
import useInput from '../../../utils/useInput';
import withRequest from '../../../utils/requestService';
import Colaborator from './colaborator';
import { Link, withRouter, Redirect } from 'react-router-dom';
import ProjectContext from '../project-context';

const ProjectSettings = function(props){

    const {owner, members, name, httpRequest,ownerId} = props;
    
    if(!owner) return <Redirect to={ `/project/${ props.match.params.projectId }` }/>


    const [rename,renameInput] = useInput(
        {
            init: "",

        }
    );

    const [newColaborator, newColaboratorInput] = useInput(
        {
            init: ""
        }
    )

    const initError = {
        rename: {
            state: false,
            message: null
        },
        addMember: {
            state: false,
            message: null
        },
    };

    const [error,setError] = React.useState(initError);
    
    const changeName = async(inLoading,newUpdate) =>{
        try{
            const project = await httpRequest(
                `/api/users/projects/${ props.match.params.projectId }`, 
                {   
                    method: 'PATCH',
                    body: JSON.stringify({
                        action: 'RENAME',
                        value: rename
                    })
                }
                );
        inLoading();
        newUpdate(project);
        }catch(err){
            const newError = Object.assign({},initError);
            if(Array.isArray(err)){
                err.map(e => 
                    newError['rename'] = {
                        state: true,
                        message: e.message
                    }
                );
            }else{
                newError["rename"] = {
                    state: true,
                    message: err.message
                }
            }
            if(error != newError){
                setError(newError)
            }
        }
        
    }

    const addColaborator = async(inLoading,newUpdate) => {
        try{
            const project = await httpRequest(
                `/api/users/projects/${ props.match.params.projectId }`, 
                {   
                    method: 'PATCH',
                    body: JSON.stringify({
                        action: 'ADD_MEMBER',
                        value: newColaborator
                    })
                }
                );
            console.log(project);
            inLoading();
            newUpdate(project);
        
        }catch(err){
            const newError = Object.assign({},initError);
            if(Array.isArray(err)){
                err.map(e => 
                    newError['addMember'] = {
                        state: true,
                        message: e.message
                    }
                );
            }else{
                newError["addMember"] = {
                    state: true,
                    message: err.message
                }
            }
            if(error != newError){
                setError(newError)
            }
        }
    }

    const deleteProject = async () => {
        await httpRequest(
            `/api/users/projects/${ props.match.params.projectId }`, 
            {   
                method: 'DELETE'
            }
        );
        props.history.push("/projects");
    }


    const listColaborator = members.map(m => 
                                {
                                    if(ownerId !== m.id)
                                    return <Colaborator
                                                key={m.id}
                                                name={m.name}
                                            />
                                    else return null;
                                });

    console.log(listColaborator)
    return(
    <ProjectContext.Consumer>
        {
            context =>
            <div className="settingContainer">

                <h1> Setting </h1>

                <Link 
                    to={ `/project/${ props.match.params.projectId }`} 
                    >
                    <button> 
                        Volver al proyecto 
                    </button>
                </Link>
                
                <button 
                    className="settingButtonDelete"
                    onClick={async ()=>{
                        context.inLoading();
                        await deleteProject();
                    }}
                    > 
                    delete 
                </button>

                <hr/>
                
                <h2>
                    Nombre del projecto: {name}
                </h2>      
                
                <div>

                    {renameInput}
        
                    <button
                        onClick={async()=>{
                                await changeName(context.inLoading,context.newUpdate)
                        }}
                        > 
                        Rename 
                    </button>
                    { error.rename.state &&  <span> { error.rename.message } </span> }

                </div>

                <hr/>

                <h2>Colaboradores</h2>
                <div className="settingContainerColaborators">
                    
                    <hr/>
                    <h2> Agregar colaborador </h2>
                        {listColaborator}
                        {newColaboratorInput}

                    <button
                        onClick={async ()=>{
                            await addColaborator(context.inLoading,context.newUpdate)
                        }}
                        > 
                        Agregar 
                    </button>
                    { error.addMember.state &&  <span> { error.addMember.message } </span> }

                </div>
            
            </div>
        }
    </ProjectContext.Consumer>
    );
}

export default withRequest(withRouter(ProjectSettings));