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
                        return <div id="tickets">
                                    <div id="tickets-actions">
                                        <div 
                                            className={`tickets__tab ${ 
                                                option === categories.PENDING && 'tickets__tab--active' }`}
                                            onClick={()=>changeOption(categories.PENDING)}
                                            > 
                                            Pendientes
                                        </div>
                                        <div 
                                            className={`tickets__tab ${ 
                                                option === categories.TAKEN && 'tickets__tab--active' }`}
                                                onClick={()=>changeOption(categories.TAKEN)}
                                                > 
                                            En proceso
                                        </div>
                                        <div 
                                            className={`tickets__tab ${ 
                                                option === categories.SOLVED && 'tickets__tab--active' }`}
                                                onClick={()=>changeOption(categories.SOLVED)}
                                                > 
                                            Terminados
                                        </div>
                                    </div>
                        
                                    <div
                                        id="tickets-panel"
                                    >
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