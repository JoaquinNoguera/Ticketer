import React from 'react';

import Ticket from './ticket';

import './styles.scss';

class Tickets extends React.Component {

    render () {
        return (
            <div id="proyect_view-tickets">
                    <div id="proyect_view-tickets-tabs">
                        <div className="proyect_view-tickets-tab proyect_view-tickets-tab-active"> pendientes </div>
                        <div className="proyect_view-tickets-tab"> en proceso </div>
                        <div className="proyect_view-tickets-tab"> terminados </div>
                    </div>

                    <div id="proyect_view-tickets-view">
                        <Ticket name='ticket #1' />
                        <Ticket name='ticket #5' />
                        <Ticket name='ticket #2' />
                        <Ticket name='ticket #78' />
                    </div>
                </div>
        );
    }
}

export default Tickets;