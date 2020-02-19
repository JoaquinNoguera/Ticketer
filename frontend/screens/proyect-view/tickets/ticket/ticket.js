import React from 'react';
import PopupTicket from '../../popup-ticket'
import { categories as ticketState } from '../../../../utils';
import './styles.scss';

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        
        this.actionButton = {
            delete: <button> Eliminar </button>,
            take: <button> Tomar </button>,
            leave: <button> Dejar </button>,
            markSolved: <button> Listo </button>,
            restore: <button> Restaurar </button>
        }
    }
    
    onChangeShow = () => {
        this.setState((state)=>({
            show: !state.show,
        }))
    }

    renderButtons = (state, owner) => {
        switch(state) {
            case ticketState.PENDING:
                return [ this.actionButton.take, this.actionButton.delete ];
            case ticketState.TAKEN:
                return [ owner, this.actionButton.leave, this.actionButton.markSolved ];
            case ticketState.SOLVED:
                return [ owner, this.actionButton.delete, this.actionButton.take, this.actionButton.restore ];
        }
    }

    render(){
        const { id, description, body, state = ticketState.SOLVED, owner } = this.props;
        const { show } = this.state;
        return (
            <div className='proyect_view-tickets-ticket' onClick={this.onChangeShow}>
                <h2> #{id} </h2>
                <p className='proyect_view-tickets-ticket-description'> {description} </p>

                <div>{ this.renderButtons(state, owner) }</div>

                <PopupTicket 
                    id={id}
                    show={show}
                    body={body}
                    description={description}
                    onChangeShow = {this.onChangeShow}
                />
            </div>
        );
    }
}

export default Ticket