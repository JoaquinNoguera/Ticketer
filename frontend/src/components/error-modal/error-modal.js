import React from 'react';
import Modal from '../modal';

import './styles.scss';

function ErrorModal({ errors , show, onClose }) {
    
    const message = (errors) ? 
    ((Array.isArray(errors)) ? (errors[0].message) : (errors.message)) : 
    ('');
    return <Modal 
                id="error-modal"
                show={ show } 
                onFocusLoss={ onClose }
            >    
                <h3> Error </h3>
                <p> { message } </p>
        
                <button 
                    className="primary small"
                    onClick={ onClose }
                >
                    OK
                </button>
    </Modal>
}

export default ErrorModal;