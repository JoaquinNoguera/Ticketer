import React from 'react';
import PopupTicket from '../../popup-ticket'
import ProjectContext from '../../../project-context';
import { categories as ticketStatus, ticketActions } from '../../../../../utils';
import './styles.scss';
import ErrorModal from '../../../../../components/error-modal';

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            error: undefined
        }
    }
    
    onChangeShowPopup = () => {
        this.setState((state)=>({
            showPopup: !state.showPopup,
        }))
    }

    render() {
        const { id, name, header, body, status, owner } = this.props;
        const { showPopup, error } = this.state;

        return (
            <ProjectContext.Consumer>
                { context => {
                    const actionButton = {
                        delete: <button
                        onClick={ event => {
                            event.stopPropagation();
                            context.handleTicketDeleted(this.props.id)
                                .catch(error => this.setState({ error }));
                        }}
                        > Eliminar </button>,
                        
                        take: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.TAKE)
                                .catch(error => this.setState({ error }));
                            } 
                        }>
                            Tomar 
                        </button>,
            
                        leave: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.DROP)
                                .catch(error => this.setState({ error }));
                            } 
                        }> 
                            Dejar
                        </button>,
            
                        markSolved: <button 
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.SOLVE)
                                .catch(error => this.setState({ error }));
                            }
                        }>
                            Listo
                        </button>,
            
                        restore: <button
                        onClick={ (event) => {
                            event.stopPropagation();
                            context.handleTicketAction(this.props.id, ticketActions.DROP)
                                .catch(error => this.setState({ error }));
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

                    return  <div className='proyect_view-tickets-ticket' onClick={ this.onChangeShowPopup }>

                        <ErrorModal 
                            show={ !!error }
                            message={ !!error ? error.message : '' }
                            onClose={ () => this.setState({ error: undefined })}
                        />        

                        <h2> #{ name } </h2>
                        <p className='proyect_view-tickets-ticket-description'>{ header }</p>

                        <div>{ renderButtons(status, owner) }</div>

                        <PopupTicket 
                            id={ id }
                            name={ name }
                            show={ showPopup }
                            body={ body }
                            header={ header }
                            onChangeShow={ this.onChangeShowPopup }
                            onEdited={ this.props.onEdited }
                        />
                    </div>
                }}
            </ProjectContext.Consumer>
        );
    }
}

export default Ticket