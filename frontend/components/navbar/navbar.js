import React from 'react';
import UserDropdown from './user-dropdown';

import './styles.scss';

class NavBar extends React.Component {

    state = {
        showUserDropdown: false
    }

    handleUserButtonClick = () => {
        this.setState(state => (
            { showUserDropdown: !state.showUserDropdown }
            ));
    }

    render () {
        const userName = 'Usuario';
        const { showUserDropdown } = this.state;
    
        return (
            <div id='navbar' >
                <h1> Ticketer </h1>
                
                <UserDropdown 
                    id='navbar-username' 
                    show={ showUserDropdown }
                    onLogOut={ this.props.onLogOut }
                    close={ this.handleUserButtonClick}
                >
                    <button onClick={ this.handleUserButtonClick }> 
                        { userName } 
                    </button>
                </UserDropdown>
            </div>
        );
    }
}

export default NavBar;