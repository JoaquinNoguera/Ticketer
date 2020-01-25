import React from 'react';

import Modal from '../../../components/modal';

import './styles.scss';

class CreateProyectModal extends React.Component {

    render () {
        const { onAccept, onCancel, ...otherProps } = this.props;

        return (
            <Modal
                className='dashboard-create_proyect-modal'
                { ...otherProps }
                onFocusLoss={ onCancel }
            >
                <div>
                    <label htmlFor='create-proyect-modal' > Nombre del proyecto </label>
                    <br />
                    <input id='create-proyect-modal-input' type='text' />
                </div>

                <button id='create-proyect-modal-button' onClick={ onAccept } > Aceptar </button>

                <button id='create-proyect-modal-close' onClick={ onCancel }> Cancelar </button>
            </Modal>
        );
    }
}

export default CreateProyectModal;