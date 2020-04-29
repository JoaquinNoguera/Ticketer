import React from 'react';
import Ticket from './ticket';
import { categories } from '../../../../utils/utils';
import withHttpRequest from '../../../../utils/requestService';
import './styles.scss';

class Tickets extends React.Component {

    handleTicketAction = (ticketId, action) => {
        this.props.httpRequest(`/api/projects/${ this.props.projectId }/tickets/${ ticketId }`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action
            })
        })
        .then(this.props.onTicketChange)
        .catch(_ => {});
    }

    handleEditTicket = (ticketId, header, body) => {
        this.props.httpRequest(`/api/projects/${ this.props.projectId }/tickets/${ ticketId }`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action: 'CHANGE',
                value: {
                    header,
                    body
                }
            })
        })
        .then(this.props.onTicketChange)
        .catch(_ => {});
    }

    handleDeleteTicket = (ticketId) => {
        this.props.httpRequest(`/api/projects/${ this.props.projectId }/tickets/${ ticketId }`,
        {
            method: 'DELETE'
        })
        .then(_ => this.props.onTicketDeleted(ticketId))
        .catch(_ => {});
    }

    createTicketComponents = (tickets, option) => {
        let ticketComponents = [];
    
        for (let t of tickets) {
            const { id, name, header, body, status, responsible } = t;
    
            if (status === option) {
                ticketComponents.push(
                    <Ticket
                        key={ id }    
                        id={ id }    
                        name={ name }
                        header={ header }
                        body={ body }
                        status={ status }
                        owner={ responsible.name }
                        onAction={ this.handleTicketAction }
                        onEdit={ this.handleEditTicket }
                        onDelete={ this.handleDeleteTicket }
                    />);
            }
        }
    
        return ticketComponents;
    }

    render () {
        const { tickets, option, changeOption } = this.props;
        
        const ticketComponents = this.createTicketComponents(tickets,option);
    
        return (
            <div id="proyect_view-tickets">
                <div id="proyect_view-tickets-tabs">
                    <div 
                        className={`proyect_view-tickets-tab ${ 
                            option === categories.PENDING && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.PENDING)}
                    > 
                        pendientes
                    </div>
                    <div 
                        className={`proyect_view-tickets-tab ${ 
                            option === categories.TAKEN && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.TAKEN)}
                    > 
                        en proceso
                    </div>
                    <div 
                        className={`proyect_view-tickets-tab ${ 
                            option === categories.SOLVED && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.SOLVED)}
                    > 
                        terminados
                    </div>
                </div>
    
                <div id="proyect_view-tickets-view">
                    { ticketComponents }
                </div>
            </div>
            );
    }
}

export default withHttpRequest(Tickets);