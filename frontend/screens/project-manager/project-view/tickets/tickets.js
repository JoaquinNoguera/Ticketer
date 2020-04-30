import React from 'react';
import Ticket from './ticket';
import { categories } from '../../../../utils/utils';
import './styles.scss';
import ProjectContext from '../../project-context';

class Tickets extends React.Component {

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
                    />);
            }
        }
    
        return ticketComponents;
    }

    render () {
        const { option, changeOption } = this.props;
    
        return (
            <ProjectContext.Consumer>
                {
                    context => {
                        const ticketComponents = this.createTicketComponents(context.tickets,option);
                        return <div id="proyect_view-tickets">
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
                }
            }
        </ProjectContext.Consumer>
        );
    }
}

export default Tickets;