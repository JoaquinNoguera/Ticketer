import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import whitRequest from '../../../utils/requestService';
import { categories } from '../../../utils';
import PopupTicket from './popup-ticket'
import Tickets from './tickets';

import './styles.scss'

class ProjectView extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            ...props,
            showCreate: false,
            option: categories.PENDING
        }
    }

    onChangeShow = () => {
        this.setState((state) => ({
            showCreate: !state.showCreate,
        }))
    }
    changeOption = (option) => {
        this.setState({
            option: option,
        })
    }

    addTicket = (newTicket) => {
       this.setState((state)=>({
           tickets: [...state.tickets, newTicket],
           showCreate: false,
       }))
    }

    handleTicketChange = (updatedTicket) => {
        this.setState(
            ({ tickets }) => (
                { 
                    tickets: tickets.map(
                        ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket )
                })
        );
    }

    handleTicketDeleted = (ticketId) => {
        this.setState(
            ({ tickets }) => (
                { 
                    tickets: tickets.filter(
                        ticket => ticket.id !== ticketId )
                }
            )
        );
    }

    handleTicketCreated = (ticket) => {
        this.setState(({ tickets }) => ({
            tickets: [ ...tickets, ticket ]
        }));
    }

    render () {
        console.log(this.state)
        const { tickets, option, showCreate, owner } = this.state;
        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    {
                        (owner 
                            && 
                        <Link 
                            to={`/project/${ this.props.match.params.projectId }/settings`} 
                        >
                            <button> Configurar</button>
                        </Link>
                        )
                    }
                    <Link to='/projects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets
                    projectId={ this.props.match.params.projectId }
                    tickets={ tickets }
                    option={ option }
                    changeOption={ this.changeOption }
                    onTicketChange={ this.handleTicketChange }
                    onTicketDeleted={ this.handleTicketDeleted }
                />

                <div 
                    id='proyect_view-add_ticket'
                    onClick={ this.onChangeShow }
                > 
                + </div>
                <PopupTicket
                    projectId={ this.props.match.params.projectId }
                    show={ showCreate }
                    forCreate={ true }
                    onChangeShow={ this.onChangeShow }
                    onCreatedTicket={ this.handleTicketCreated }
                />
            </div>
        );
    }
}

export default whitRequest(withRouter(ProjectView));