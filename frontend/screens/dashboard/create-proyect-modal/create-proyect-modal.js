import React from 'react';
import Modal from '../../../components/modal';
import useInput from '../../../utils/useInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

function CreateProyectModal(props) {

    const [project, projectInput] = useInput(
        {
            init: '',
            id: 'create-proyect-modal-input'
        }
    )

    const { onAccept, onCancel, ...otherProps } = props;

    return (
        <Modal
            className='dashboard-create_proyect-modal'
            {...otherProps}
            onFocusLoss={onCancel}
        >
            <h3> Agregar proyecto </h3>

            {projectInput}

            <div id='create-proyect-modal-actions'>
                <button
                    id='create-proyect-modal-close'
                    className="warn small"
                    onClick={onCancel}
                >
                    <FontAwesomeIcon icon={faTimesCircle} className='mr1' />
                    Cancelar
                </button>

                <button
                    id='create-proyect-modal-button'
                    className="primary small"
                    onClick={() => onAccept(project)}
                >
                    <FontAwesomeIcon icon={faCheck} className='mr1' />
                    Aceptar
                </button>
            </div>


        </Modal>
    );
}

export default CreateProyectModal;