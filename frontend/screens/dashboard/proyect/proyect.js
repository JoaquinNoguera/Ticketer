import React from 'react';
import { Link } from 'react-router-dom';
import withRequest from '../../../utils/requestService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import ConfirmationButton from '../../../components/confirmation-button';

import './styles.scss'

const Proyect = function ({ name, id, username, httpRequest, handleDropOut }) {
    
    const deleteColaborator = async () => {
        await httpRequest(
            `/api/users/projects/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    action: 'REMOVE_MEMBER',
                    value: username
                })
            }
        );
        return id;
    }

    return (
        <div className='dashboard-proyect'>
            <h3>{name} </h3>
            <div className='dashboard-proyect-actions' >
                <Link to={`/project/${id}`} >
                    <button className='primary small'>
                        <FontAwesomeIcon icon={faFolderOpen} className='mr1' />
                        Abrir
                    </button>
                </Link>

                <ConfirmationButton
                    className='warn small'
                    onConfirm={async() => {
                        await handleDropOut(deleteColaborator); 
                    }}
                    message='¿Esta seguro que desea darse de baja del proyecto?'
                >
                    <FontAwesomeIcon icon={faTimesCircle} className='mr1' />
                    Darse de baja
                </ConfirmationButton>
            </div>
        </div>
    );
}

export default withRequest(Proyect);