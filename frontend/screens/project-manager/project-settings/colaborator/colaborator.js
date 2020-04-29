import React from 'react';
import withRequest from'../../../../utils/requestService';
import {withRouter} from 'react-router-dom';
import './style.scss';

function Colaborator(props) {

    const {name,newUpdate,inLoading, httpRequest} = props;


    const deleteColaborator = async () => {
        inLoading();
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

        newUpdate(project);
    }


    return(
        <div className="colaboratorContainer">
            
            <h3>
                {name}
            </h3>
            
            <button 
                className="colaboratorButton"
                onClick={deleteColaborator}
            >
                X
            </button>

        </div>
    );
}

export default withRouter(withRequest(Colaborator));