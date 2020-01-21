import React from 'react';
import ReactDOM from 'react-dom';

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
        const { show, children, ...otherProps } = this.props;

        const toRender = [ children ];

        console.log(children);

        if (show) {
            toRender.push(ReactDOM.createPortal(

                <div id='navbar-user-dropdown' style={ this.state.dropdownStyle }>
                    <div className='navbar-user-dropdown-item' > Cerrar sesion </div>
                    <div className='navbar-user-dropdown-item' > Configuracion </div>
                </div>
                
            , document.getElementById('popup-root')));
        }
        
        return <div { ...otherProps } ref={ this.childrenRef }>
            { toRender }
        </div>
    }
}

export default UserDropdown;