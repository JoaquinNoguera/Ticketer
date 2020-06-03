import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

class Modal extends React.Component {

    pointerDownStartedHere = false;
    
    render () {
        const { show, children, className, onFocusLoss, ...otherProps } = this.props;
        
        if (show)
            return (ReactDOM.createPortal(

                <div 
                    className='modal-background'
                    onPointerDown={ event => { 
                        event.stopPropagation();
                        this.pointerDownStartedHere = true; 
                    }}
                    onClick={ event => { 
                        event.stopPropagation(); 
                        if (this.pointerDownStartedHere) {
                            onFocusLoss(); 
                        }
                        this.pointerDownStartedHere = false;
                    }}
                >
                    <div 
                        className={ `modal-root ${ className || '' }` }
                        onClick={ event => event.stopPropagation() }
                        onPointerDown={ event => event.stopPropagation() }
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