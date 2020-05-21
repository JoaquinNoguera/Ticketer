import React from 'react';
import withRequest from '../../../../utils/requestService';
import ProjectContext from '../../project-context';
import { withRouter } from 'react-router-dom';
import './style.scss';

import ConfirmationButton from '../../../../components/confirmation-button';

function Colaborator(props) {

    const { name, httpRequest } = props;

    const deleteColaborator = async () => {
        const project = await httpRequest(
            `/api/users/projects/${props.match.params.projectId}`,
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


    return (
        <ProjectContext.Consumer>
            {context =>
                <div
                    id="colaborator"
                >
                    <p>
                        {name}
                    </p>

                    <ConfirmationButton
                        onConfirm={async () => {
                            context.inLoading();
                            context.newUpdate(await deleteColaborator())
                        }}
                        message='¿Está seguro que desea eliminar este miembro del proyecto?'
                    >
                        X
                    </ConfirmationButton>

                </div>
            }
        </ProjectContext.Consumer>
    );
}

export default withRouter(withRequest(Colaborator));