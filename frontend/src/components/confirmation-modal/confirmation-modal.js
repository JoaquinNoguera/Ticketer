import React from 'react';
import Modal from '../modal';

import './styles.scss';

export default function ({ show, onConfirm, onCancel, message }) {

    return (
        <Modal
            show={show}
            onFocusLoss={onCancel}
            className='confirmation-modal'
        >
            <h3>
                {message}
            </h3>
            <div className='confirmation-modal--actions'>
                <button className='primary' onClick={onConfirm} > Aceptar </button>
                <button className='warn' onClick={onCancel}> Cancelar </button>
            </div>
        </Modal>
    );
}