import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'

const Proyect = function ({ name, id }) {

    return (
        <div className='dashboard-proyect'>
            <h3>{ name } </h3>
            <div className='dashboard-proyect-actions' >
                <Link to={`/project/${ id }`} ><button > Abrir </button></Link>
                <button> Darse de baja </button>
            </div>
        </div>
    );
}

export default Proyect;