import React from 'react';
import PopupTicket from '../../popup-ticket'
import ProjectContext from '../../../project-context';
import { categories as ticketStatus, ticketActions } from '../../../../../utils';
import './styles.scss';

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }
    
    onChangeShow = () => {
        this.setState((state)=>({
            show: !state.show,
        }))
    }

    render() {
        const { id, name, header, body, status, owner } = this.props;
        const { show } = this.state;
        return (
            <ProjectContext.Consumer>
                { context => {
                    const actionButton = {
                        delete: <button
                        onClick={ _ => {
                            context.handleTicketDeleted(this.props.id)   
                        }}
                        > Eliminar </button>,
                        
                        take: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.TAKE); 
                            } 
                        }>
                            Tomar 
                        </button>,
            
                        leave: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.DROP); 
                            } 
                        }> 
                            Dejar
                        </button>,
            
                        markSolved: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.SOLVE); 
                            }
                        }>
                            Listo
                        </button>,
            
                        restore: <button
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.DROP); 
                            } 
                        }> 
                            Restaurar 
                        </button>
                    }

                    const renderButtons = (status, owner) => {
                        switch(status) {
                            case ticketStatus.PENDING:
                                return [ actionButton.take, actionButton.delete ];
                            case ticketStatus.TAKEN:
                                return [ owner, actionButton.leave, actionButton.markSolved ];
                            case ticketStatus.SOLVED:
                                return [ owner, actionButton.delete, actionButton.take, actionButton.restore ];
                        }
                    }

                    return  <div className='proyect_view-tickets-ticket' onClick={ this.onChangeShow }>
                                <h2> #{ name } </h2>
                                <p className='proyect_view-tickets-ticket-description'>{ header }</p>

                                <div>{ renderButtons(status, owner) }</div>

                                <PopupTicket 
                                    id={ id }
                                    name={ name }
                                    show={ show }
                                    body={ body }
                                    header={ header }
                                    onChangeShow={ this.onChangeShow }
                                    onEdited={ this.props.onEdited }
                                />
                            </div>
                }}
            </ProjectContext.Consumer>
        );
    }
}

export default Ticket