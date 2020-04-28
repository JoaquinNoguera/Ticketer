import React from 'react';

import Modal from '../../../components/modal';

import './styles.scss';

class CreateProyectModal extends React.Component {

    state = {
        project: ''
    }

    handleInputChange = (event) => {
        this.setState({ project: event.target.value });
    }

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
                    <input 
                    id='create-proyect-modal-input' 
                    type='text'
                    onChange={ this.handleInputChange }
                    value={ this.state.project }
                    />
                </div>

                <button 
                id='create-proyect-modal-button' 
                onClick={ () => onAccept(this.state.project) }
                > 
                    Aceptar 
                </button>

                <button id='create-proyect-modal-close' onClick={ onCancel }> Cancelar </button>
            </Modal>
        );
    }
}

export default CreateProyectModal;