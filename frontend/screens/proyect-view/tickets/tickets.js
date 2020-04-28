import React from 'react';
import Ticket from './ticket';
import './styles.scss';
import { categories } from '../../../utils/utils';
    
function createListTikets(tickets, option) {
    let ticketComponents = [];

    for (let t of tickets) {
        const { id, name, header, body, status, responsible } = t;

        if (status === option) {
            ticketComponents.push(
                <Ticket
                    key={ id }        
                    name={ name }
                    header={ header }
                    body={ body }
                    status={ status }
                    owner={ responsible.name }
                />);
        }
    }

    return ticketComponents;
}
    
    export default function Tickets(props) {
        const { tickets, option, changeOption } = props;

        const ticketComponents = createListTikets(tickets,option);

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