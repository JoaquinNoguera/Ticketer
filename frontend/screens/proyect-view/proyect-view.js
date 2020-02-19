import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import whitRequest from '../../utils/requestService';
import {categories} from '../../utils/utils';
import PopupTicket from './popup-ticket'
import Tickets from './tickets';
import './styles.scss'

class ProyectView extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tikets: [
            ],
            option: categories.PENDING,
            showCreate: false
        }
    }

    componentDidMount(){
        this.props.httpRequest('/api/project', {
            method: 'GET',
        })
        .then(tikets => this.setState({
            tikets: tikets
        }))
        .catch(_=> console.log('error'));
    }

    onChangeShow = () => {
        this.setState((state) => ({
            showCreate: !state.showCreate,
        }))
    }
    changeOption = (option) => {
        this.setState({
            option: option,
        })
    }

    addTiket = (newTicket) => {
       console.log(newTicket);
       this.setState((state)=>({
           tikets: [...state.tikets, newTicket],
           showCreate: false,
       }))
    }
    render () {
        const {tikets,option, showCreate} = this.state;
        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <Link to={`/project/${ this.props.match.params.projectId }/settings`} ><button> Configurar (solo creador) </button></Link>
                    <Link to='/projects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets
                    tikets={tikets}
                    option ={option}
                    changeOption = {this.changeOption}
                />

                <div 
                    id='proyect_view-add_ticket'
                    onClick = {this.onChangeShow}
                > 
                + </div>
                <PopupTicket
                    show={showCreate}
                    forCreate = {true}
                    addTiket = {this.addTiket}
                    onChangeShow = {this.onChangeShow}
                />
            </div>
        );
    }
}

export default whitRequest(withRouter(ProyectView));