import React from 'react';
import Modal from '../modal';

import './styles.scss';

function ConfirmModal({ message , show, onClose }) {
    
    return <Modal 
                id="confirm-modal"
                show={ show } 
                onFocusLoss={ onClose }
            >    
                <p> { message } </p>
        
                <button 
                    className="primary small"
                    onClick={ onClose }
                >
                    OK
                </button>
    </Modal>
}

export default ConfirmModal;