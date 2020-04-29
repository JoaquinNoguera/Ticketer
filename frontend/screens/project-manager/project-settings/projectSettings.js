import React from 'react';
import './style.scss';
import useInput from '../../../utils/useInput';
import withRequest from '../../../utils/requestService';
import Colaborator from './colaborator';
import { Link, withRouter, Redirect } from 'react-router-dom';

const ProjectSettings = function(props){

    const {owner, members, name, httpRequest, ownerId,newUpdate, inLoading} = props;
    
    if(!owner) return <Redirect to={ `/project/${ props.match.params.projectId }` }/>


    const [rename,renameInput] = useInput(
        {
            init: "",

        }
    );

    const [newColaborator, newColaboratorInput] = useInput(
        {
            input: ""
        }
    )

    
    const changeName = async() =>{
        inLoading();
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

        newUpdate(project);
        
    }

    const addColaborator = async() => {
        inLoading();
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
        newUpdate(project);
    }

    const deleteProject = async () => {
        inLoading();
        const project = await httpRequest(
            `/api/users/projects/${ props.match.params.projectId }`, 
            {   
                method: 'DELETE'
            }
        );
        props.history.push("/projects");
    }


    const listColaborator = members.map(m => 
                                {
                                    console.log(ownerId,m.id)
                                    if(ownerId !== m.id)
                                    return <Colaborator
                                                key={m.id}
                                                name={m.name}
                                                newUpdate={newUpdate}
                                                inLoading={inLoading}
                                            />
                                });


    return(
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
                onClick={deleteProject}
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
                    onClick={changeName}
                > 
                    Rename 
                </button>

            </div>

            <hr/>

            <h2>Colaboradores</h2>
            <div className="settingContainerColaborators">
                
                <hr/>
                <h2> Agregar colaborador </h2>
                    {listColaborator}

                    {newColaboratorInput}

                <button
                    onClick={addColaborator}
                > 
                    Agregar 
                </button>
            </div>
         
        </div>
    );
}

export default withRequest(withRouter(ProjectSettings));