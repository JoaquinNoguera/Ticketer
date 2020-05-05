import React from 'react';
import Modal from '../../../components/modal';
import useInput from '../../../utils/useInput';

import './styles.scss';

function CreateProyectModal (props){

    const [ project, projectInput ] = useInput(
        {
            init: '',
            id: 'create-proyect-modal-input'
        }
    )

    const { onAccept, onCancel, ...otherProps } = props;

    return (
        <Modal
        className='dashboard-create_proyect-modal'
        { ...otherProps }
        onFocusLoss={ onCancel }
        >
            <h3> Agregar producto </h3>

            { projectInput }

            <div id='create-proyect-modal-actions'>
                <button 
                    id='create-proyect-modal-close'
                    className="warn small" 
                    onClick={ onCancel }
                > 
                    Cancelar
                </button>
                
                <button 
                    id='create-proyect-modal-button' 
                    className="primary small"
                    onClick={ () => onAccept(project) }
                > 
                    Aceptar 
                </button>
            </div>

        
        </Modal>
    );
}

export default CreateProyectModal;