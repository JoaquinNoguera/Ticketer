import React from 'react';

import './styles.scss'

const Proyect = function ({ name }) {

    return (
        <div className='dashboard-proyect'>
        <h3>{ name } </h3>
        <button className='dashboard-proyect-abandon'> Darse de baja </button> 
        </div>
    );
}

export default Proyect;