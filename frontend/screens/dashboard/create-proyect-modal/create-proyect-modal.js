import React from 'react';
import Modal from '../../../components/modal';
import useInput from '../../../utils/useInput';

import './styles.scss';

function CreateProyectModal (props){

    const [project, projectInput] = useInput(
        {
            init: "",
            
        }
    )


    const { onAccept, onCancel, ...otherProps } = props;

    return (
        <Modal
                className='dashboard-create_proyect-modal'
                { ...otherProps }
                onFocusLoss={ onCancel }
        >
                
            <div>
                <label 
                    htmlFor='create-proyect-modal'
                > 
                    Nombre del proyecto 
                </label>
                    
                <br />
                
                {projectInput}

            </div>

            <button 
                id='create-proyect-modal-button' 
                onClick={ () => onAccept(project) }
            > 
                Aceptar 
            </button>

            <button 
                id='create-proyect-modal-close' 
                onClick={ onCancel }
            > 
                Cancelar
            </button>
        
        </Modal>
    );
}

export default CreateProyectModal;