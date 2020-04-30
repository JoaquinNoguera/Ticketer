import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import './styles.scss';

class UserDropdown extends React.Component {

    childrenRef = React.createRef();

    componentDidMount() {
        if (this.childrenRef)
            this.setState({ dropdownStyle: {
                top: `${ this.childrenRef.current.offsetTop + this.childrenRef.current.offsetHeight }px`,
                right: '0px'
            }});
    }
    
    render () {
        const { show, children, onLogOut, close, ...otherProps } = this.props;

        const toRender = [ children ];

        if (show) {
            toRender.push(ReactDOM.createPortal(

                <div id='navbar-user-dropdown' style={ this.state.dropdownStyle }>
                    <Link
                        to="/user/setting"
                        onClick={close}
                    >
                        <div 
                            className='navbar-user-dropdown-item' 
                        > 
                            Configuración
                        </div>
                    </Link>

                    <Link 
                    to='/login' 
                    >
                        <div 
                            className='navbar-user-dropdown-item' 
                            onClick={ onLogOut } 
                        > 
                            Cerrar sesion 
                        </div>
                    </Link>
                </div>
                
            , document.getElementById('popup-root')));
        }
        
        return <div 
                    { ...otherProps } 
                    ref={ this.childrenRef }
                >
                        { toRender }
                </div>
    }
}

export default UserDropdown;