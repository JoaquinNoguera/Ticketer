import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

class Modal extends React.Component {
    
    render () {
        const { show, children, className, onFocusLoss, ...otherProps } = this.props;
        
        if (show)
            return (ReactDOM.createPortal(

                <div 
                    className='modal-background'
                    onClick={ event => { event.stopPropagation(); onFocusLoss() } }
                >
                    <div 
                        className={ `modal-root ${ className || '' }` }
                        onClick={ event => event.stopPropagation() }
                        { ...otherProps }
                    >
                        { children }
                    </div>
                </div>

                , document.getElementById('popup-root')));
        else
            return null;
    }
}

export default Modal;