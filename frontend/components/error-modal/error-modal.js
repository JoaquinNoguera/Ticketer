import React from 'react';
import Modal from '../modal';

import './styles.scss';

function ErrorModal({ message, show, onClose }) {
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