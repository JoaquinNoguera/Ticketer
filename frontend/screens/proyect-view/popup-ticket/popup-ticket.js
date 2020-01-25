import React from 'react';
import Modal from '../../../components/modal'
import './styles.scss';

export default class PopupTicket extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            edit: false,
        }
        this.onChangeEdit = this.onChangeEdit.bind(this);
    }

    onChangeEdit(){
        this.setState((state)=>({
            edit: !state.edit
        }))
    }

    render(){
        const {show, onChangeShow, id, body, description} = this.props;
        const {edit} = this.state;
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
                        (edit) ?
                        (
                            <>
                            <textarea 
                            value={description}
                            className = 'popupTicketInputD '
                            />
                            <hr/>
                            <textarea 
                            value={body}
                            className = 'popupTicketInputB'
                            />
                               <button 
                                onClick={this.onChangeEdit}
                            > 
                                guardar 
                            </button>
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