import React from 'react';
import Ticket from './ticket';
import './styles.scss';
import {categories} from '../../../utils/utils';
    
function createListTikets(tikets,option) {
    let listTikets = [];
    for(let t of tikets){
    const {id, description, body, category} = t;
    if (category === option){
        listTikets.push(<Ticket
            key= {id}        
            id = {id}
            description = {description}
            body = {body}
            />);
            }
        }
        return listTikets;
    }
    
    export default function Tickets(props) {
        const {tikets, option,changeOption} = props;
        const listTikets = createListTikets(tikets,option);
        return (
            <div id="proyect_view-tickets">
                <div id="proyect_view-tickets-tabs">
                    <div 
                        className={`proyect_view-tickets-tab ${ option === 0 && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.PENDING)}
                    > 
                        pendientes
                    </div>
                    <div 
                        className={`proyect_view-tickets-tab ${ option === 1 && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.TAKEN)}
                    > 
                        en proceso
                    </div>
                    <div 
                        className={`proyect_view-tickets-tab ${ option === 2 && 'proyect_view-tickets-tab-active' }`}
                        onClick={()=>changeOption(categories.SOLVED)}
                    > 
                        terminados
                    </div>
                </div>
    
                <div id="proyect_view-tickets-view">
                    {listTikets}
                </div>
            </div>
            );
    }