import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './styles.scss'

const Proyect = function ({ name, id }) {

    return (
        <div className='dashboard-proyect'>
            <h3>{ name } </h3>
            <div className='dashboard-proyect-actions' >
                <Link to={`/project/${ id }`} >
                    <button className='primary small'>
                        <FontAwesomeIcon icon={ faFolderOpen } className='mr1' />
                        Abrir 
                    </button>
                </Link>

                <button className='warn small' >
                    <FontAwesomeIcon icon={ faTimesCircle } className='mr1' />
                    Darse de baja
                </button>
            </div>
        </div>
    );
}

export default Proyect;