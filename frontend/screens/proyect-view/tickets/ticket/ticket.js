import React from 'react';

import './styles.scss'

const Ticket = function ({ name }) {
    return (
        <div className='proyect_view-tickets-ticket'> { name } </div>
    );
}

export default Ticket