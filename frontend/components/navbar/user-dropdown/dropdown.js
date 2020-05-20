import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

class UserDropdown extends React.Component {

    childrenRef = React.createRef();

    componentDidMount() {
        if (this.childrenRef)
            this.setState({
                dropdownStyle: {
                    top: `${this.childrenRef.current.offsetTop + this.childrenRef.current.clientHeight}px`,
                    right: '0px'
                }
            });
    }

    render() {
        const { show, children, onLogOut, close, ...otherProps } = this.props;

        const toRender = [children];

        if (show) {
            toRender.push(ReactDOM.createPortal(

                <div id='navbar-user-dropdown' style={this.state.dropdownStyle}>
                    <Link
                        to="/user/setting"
                        onClick={close}
                    >
                        <div
                            className='navbar-user-dropdown-item'
                        >
                            <FontAwesomeIcon icon={faCog} className='mr1' />
                            Configuración
                        </div>
                    </Link>

                    <Link
                        to='/login'
                    >
                        <div
                            className='navbar-user-dropdown-item'
                            onClick={onLogOut}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} className='mr1' />
                            Cerrar sesion
                        </div>
                    </Link>
                </div>

                , document.getElementById('popup-root')));
        }

        return <div
            {...otherProps}
            ref={this.childrenRef}
        >
            {toRender}
        </div>
    }
}

export default UserDropdown;