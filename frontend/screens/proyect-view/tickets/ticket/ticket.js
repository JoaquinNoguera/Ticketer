import React from 'react';
import './styles.scss'

class Ticket extends React.Component {
    

    render(){
        const {id, description, body} = this.props
        return (
            <>
            <div className='proyect_view-tickets-ticket' onClick={this.changeShow}>
                <h2> #{id} </h2>
                <p> {description} </p>
            </div>
            </>
        );
    }
}

export default Ticket