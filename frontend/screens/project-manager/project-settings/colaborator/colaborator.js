import React from 'react';
import withRequest from'../../../../utils/requestService';
import ProjectContext from '../../project-context';
import {withRouter} from 'react-router-dom';
import './style.scss';

function Colaborator(props) {

    const {name, httpRequest} = props;


    const deleteColaborator = async () => {
        const project = await httpRequest(
            `/api/users/projects/${ props.match.params.projectId }`, 
            {   
                method: 'PATCH',
                body: JSON.stringify({
                    action: 'REMOVE_MEMBER',
                    value: name
                })
            }
        );

        return project;
    }

    
    console.log("hola");

    return(
        <ProjectContext.Consumer>
            {context =>
            <div className="colaboratorContainer">
                    <h3>
                        {name}
                    </h3>
                    
                    <button 
                        className="colaboratorButton"
                        onClick={()=>{
                            context.inLoading();
                            context.newUpdate(deleteColaborator())
                        }}
                        >
                        X
                    </button>

                </div>
            }
        </ProjectContext.Consumer>
    );
}

export default withRouter(withRequest(Colaborator));