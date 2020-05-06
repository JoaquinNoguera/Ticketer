import React from 'react';
import Modal from '../modal';

import './styles.scss';

function ErrorModal({ errors , show, onClose }) {
    
    const message = (errors) ? 
    ((Array.isArray(errors)) ? (errors[0].message) : (errors.message)) : 
    ('');
    return <Modal 
    show={ show } 
    onFocusLoss={ onClose }
    >    
        <p> { message } </p>
        
        <button 
        onClick={ onClose }
        >
            OK
        </button>
    </Modal>
}

export default ErrorModal;