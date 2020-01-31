import React from 'react';
import Modal from '../../../components/modal'
import {onChangeState} from '../../../utils/utils';
import './styles.scss';

export default class PopupTicket extends React.Component {
    
    constructor(props){
        super(props);
        const {id, body, description} = props;
        this.state = {
            edit: false,
            id: id,
            body: body,
            description: description
        }
        this.onChangeEdit = this.onChangeEdit.bind(this);
    }

    onChangeEdit(){
        this.setState((state)=>({
            edit: !state.edit
        }))
    }

    render(){
        const {show, onChangeShow, forCreate, addTiket} = this.props;
        const {edit, id, body, description} = this.state;
        return(
            <Modal 
                show = {show}
                onFocusLoss = {onChangeShow}
                className= "ticketModalContainer"
            >
                    <button
                        onClick={onChangeShow}
                        className="ticketModalButtonClose"
                    >X
                    </button>
                    <h1>
                        #{id}
                    </h1>

                    {
                        (edit || forCreate) ?
                        (
                            <>
                            <textarea 
                            value={description}
                            className = 'popupTicketInputD '
                            onChange = {(e) => {
                                onChangeState.call(this,e,"description");
                            }}
                            />
                            <hr/>
                            <textarea
                            value={body} 
                            className = 'popupTicketInputB'
                            onChange = {(e) => {
                                onChangeState.call(this,e,"body");
                            }}
                            />
                               {
                                   (forCreate) ? (
                                        <button 
                                            onClick={() => {
                                                addTiket({
                                                id: id,
                                                description: description,
                                                body: body,
                                                category: 0,
                                            })
                                            }}
                                        > 
                                            Crear
                                        </button>
                                   ): (
                                    <button 
                                        onClick={this.onChangeEdit}
                                    > 
                                        Guardar 
                                    </button>
                                   )
                               }
                              
                            </>
                        ) :
                        (
                            <>
                            <p>{description}</p>
                            <hr/>
                            <p>{body}</p>
                            <button 
                                onClick={this.onChangeEdit}
                            > 
                                editar 
                            </button>
                            </>
                        )
                    }
            </Modal>
        )
    }
    
}
PopupTicket.defaultProps = {
    id: 999,
    description: "",
    body: "",
    forCreate: false,
}