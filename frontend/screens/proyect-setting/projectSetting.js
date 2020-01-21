import React from 'react';
import './style.scss';
import Colaborator from './colaborator';

export default function ProjectSetting(){
    return(
        <div className="settingContainer">
            <h1>Setting</h1>
            <button className="settingButtonDelete">delete</button>

            <hr/>
            <h2>Nombre del projecto: "Nombre"</h2>
            <div>
                <input/>
                <button>Rename</button>
            </div>
            <hr/>
            <h2>Colaboradores</h2>
            <div className="settingContainerColaborators">
            <Colaborator/>
            <Colaborator/>
            <hr/>
            <h2>Agregar colaborador</h2>
            <input/>
            <button>Search</button>
            </div>

         
        </div>
    );
}