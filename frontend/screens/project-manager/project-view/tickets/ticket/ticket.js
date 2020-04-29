import React from 'react';
import PopupTicket from '../../popup-ticket'
import { categories as ticketStatus, ticketActions } from '../../../../../utils';
import './styles.scss';

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        
        this.actionButton = {
            delete: <button> Eliminar </button>,
            
            take: <button 
            onClick={ (event) => {
                event.stopPropagation();
                props.onAction(this.props.id, ticketActions.TAKE); 
                } 
            }>
                Tomar 
            </button>,

            leave: <button 
            onClick={ (event) => {
                event.stopPropagation();
                props.onAction(this.props.id, ticketActions.DROP); 
                } 
            }> 
                Dejar
            </button>,

            markSolved: <button 
            onClick={ (event) => {
                event.stopPropagation();
                props.onAction(this.props.id, ticketActions.SOLVE); 
                }
            }>
                Listo
            </button>,

            restore: <button
            onClick={ (event) => {
                event.stopPropagation();
                props.onAction(this.props.id, ticketActions.DROP); 
                } 
            }> 
                Restaurar 
            </button>
        }
    }
    
    onChangeShow = () => {
        this.setState((state)=>({
            show: !state.show,
        }))
    }

    

    renderButtons = (status, owner) => {
        switch(status) {
            case ticketStatus.PENDING:
                return [ this.actionButton.take, this.actionButton.delete ];
            case ticketStatus.TAKEN:
                return [ owner, this.actionButton.leave, this.actionButton.markSolved ];
            case ticketStatus.SOLVED:
                return [ owner, this.actionButton.delete, this.actionButton.take, this.actionButton.restore ];
        }
    }

    render() {
        const { id, name, header, body, status, owner } = this.props;
        const { show } = this.state;
        return (
            <div className='proyect_view-tickets-ticket' onClick={ this.onChangeShow }>
                <h2> #{ name } </h2>
                <p className='proyect_view-tickets-ticket-description'>{ header }</p>

                <div>{ this.renderButtons(status, owner) }</div>

                <PopupTicket 
                    name={ name }
                    show={ show }
                    body={ body }
                    header={ header }
                    onChangeShow={ this.onChangeShow }
                    onSaveChanges={ (header, body) => this.props.onEdit(id, header, body) }
                />
            </div>
        );
    }
}

export default Ticket