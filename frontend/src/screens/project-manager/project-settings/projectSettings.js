import React from 'react';
import './style.scss';
import useInput from '../../../utils/useInput';
import withRequest from '../../../utils/requestService';
import Colaborator from './colaborator';
import { Link, withRouter, Redirect } from 'react-router-dom';
import ProjectContext from '../project-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faTimesCircle, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import ConfirmationButton from '../../../components/confirmation-button';

const ProjectSettings = function (props) {

    const { owner, members, name, httpRequest, ownerId } = props;

    if (!owner) return <Redirect to={`/project/${props.match.params.projectId}`} />

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

    const [error, setError] = React.useState(initError);

    const [rename, renameInput] = useInput(
        {
            init: "",
            placeholder: "Nuevo nombre...",
            className: (error["rename"].state) ? "warn" : ""

        }
    );

    const [newColaborator, newColaboratorInput] = useInput(
        {
            init: "",
            placeholder: "Nuevo colaborador...",
            className: (error["addMember"].state) ? "warn" : ""
        }
    )

    const changeName = async (inLoading, newUpdate) => {
        try {
            const project = await httpRequest(
                `/api/users/projects/${props.match.params.projectId}`,
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
        } catch (err) {
            const newError = Object.assign({}, initError);
            if (Array.isArray(err)) {
                err.map(e =>
                    newError['rename'] = {
                        state: true,
                        message: e.message
                    }
                );
            } else {
                newError["rename"] = {
                    state: true,
                    message: err.message
                }
            }
            if (error != newError) {
                setError(newError)
            }
        }

    }

    const addColaborator = async (inLoading, newUpdate) => {
        try {
            const project = await httpRequest(
                `/api/users/projects/${props.match.params.projectId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        action: 'ADD_MEMBER',
                        value: newColaborator
                    })
                }
            );
            inLoading();
            newUpdate(project);

        } catch (err) {
            const newError = Object.assign({}, initError);
            if (Array.isArray(err)) {
                err.map(e =>
                    newError['addMember'] = {
                        state: true,
                        message: e.message
                    }
                );
            } else {
                newError["addMember"] = {
                    state: true,
                    message: err.message
                }
            }
            if (error != newError) {
                setError(newError)
            }
        }
    }

    const deleteProject = async () => {
        await httpRequest(
            `/api/users/projects/${props.match.params.projectId}`,
            {
                method: 'DELETE'
            }
        );
        props.history.push("/projects");
    }


    const listColaborator = members.map(m => {
        if (ownerId !== m.id)
            return <Colaborator
                key={m.id}
                name={m.name}
            />
        else return null;
    });

    
    return (
        <ProjectContext.Consumer>
            {
                context =>
                    <div id="projectSettings">

                        <h2> Configuracion de proyecto </h2>

                        <div
                            id="projectSettings-actions"
                        >
                            <Link
                                to={`/project/${props.match.params.projectId}`}
                            >
                                <button
                                    className="secondary"
                                >
                                    <FontAwesomeIcon icon={faArrowCircleLeft} className='mr1' />
                                    Volver
                                </button>
                            </Link>

                            <ConfirmationButton
                                className="warn"
                                onConfirm={async () => {
                                    context.inLoading();
                                    await deleteProject();
                                }}
                                message='¿Está seguro que desea eliminar el proyecto y todos sus tickets?'
                            >
                                <FontAwesomeIcon icon={faTimesCircle} className='mr1' />
                                Eliminar
                            </ConfirmationButton>
                        </div>


                        <div id="projectSettings-options">
                            <h3>
                                Nombre actual: <span className="fine">{name}</span>
                            </h3>

                            {renameInput}

                            <span
                                className="warn"
                            >
                                {error.rename.message}
                            </span>

                            <button
                                className="primary"
                                onClick={async () => {
                                    await changeName(context.inLoading, context.newUpdate)
                                }}
                            >
                                <FontAwesomeIcon icon={faPen} className='mr1' />
                                Renombrar
                            </button>


                            <hr />

                            <h3>
                                Agregar colaborador
                            </h3>

                            {newColaboratorInput}

                            <span
                                className="warn"
                            >
                                {error.addMember.message}
                            </span>

                            <button
                                className="primary"
                                onClick={async () => {
                                    await addColaborator(context.inLoading, context.newUpdate)
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} className='mr1' />
                                Agregar Colaborador
                            </button>

                            { listColaborator[0] && <h3> Colaboradoradores </h3>}

                            <div id="colaborator-list">
                                {listColaborator}
                            </div>


                        </div>
                    </div>
            }
        </ProjectContext.Consumer>
    );
}

export default withRequest(withRouter(ProjectSettings));