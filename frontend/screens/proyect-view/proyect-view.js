import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import whitRequest from '../../utils/requestService';
import { categories } from '../../utils/utils';
import PopupTicket from './popup-ticket'
import Tickets from './tickets';

import './styles.scss'

class ProyectView extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tickets: [
            ],
            option: categories.PENDING,
            showCreate: false
        }
    }

    componentDidMount(){
        this.props.httpRequest(`/api/projects/${ this.props.match.params.projectId }`, {
            method: 'GET',
        })
        .then(project => this.setState({
            tickets: project.tickets
        }))
        .catch(_=> console.log('error'));
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

    render () {
        const { tickets, option, showCreate } = this.state;

        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <Link to={`/project/${ this.props.match.params.projectId }/settings`} ><button> Configurar (solo creador) </button></Link>
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
                    show={ showCreate }
                    forCreate={ true }
                    addTicket={ this.addTicket }
                    onChangeShow={ this.onChangeShow }
                />
            </div>
        );
    }
}

export default whitRequest(withRouter(ProyectView));