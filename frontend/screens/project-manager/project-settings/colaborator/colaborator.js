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


    return(
        <ProjectContext.Consumer>
            {context =>
            <div
                id="colaborator"
            >
                    <p>
                        {name}
                    </p>
                    
                    <button
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