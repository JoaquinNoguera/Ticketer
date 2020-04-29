import React from 'react';
import Modal from '../../../../components/modal'
import { onChangeState } from '../../../../utils/utils';
import './styles.scss';
import withRequest from '../../../../utils/requestService';

class PopupTicket extends React.Component {
    
    constructor(props){
        super(props);
        const { name, body, header } = props;

        this.state = {
            edit: false,
            name: name,
            body: body,
            header: header
        }
    }

    onChangeEdit = () => {
        this.setState((state)=>({
            edit: !state.edit
        }))
    }

    handleSave = () => {
        this.setState(state => ({
            edit: !state.edit
        }));

        this.props.onSaveChanges(this.state.header, this.state.body);
    }

    handleCreate = () => {
        this.props.httpRequest(`/api/projects/${ this.props.projectId }/tickets`,
        {
            method: 'POST',
            body: JSON.stringify({
                header: this.state.header,
                body: this.state.body
            })
        })
        .then(ticket => {
            this.props.onCreatedTicket(ticket);
            this.props.onChangeShow();
        })
        .catch(_ => {});
    }

    render(){
        const { show, onChangeShow, forCreate } = this.props;
        const { edit, name, body, header } = this.state;

        return(
            <Modal 
                show = {show}
                onFocusLoss = {onChangeShow}
                className= "ticketModalContainer"
            >
                    <button
                        onClick={onChangeShow}
                        className="ticketModalButtonClose"
                    >
                        X
                    </button>

                    <h1> #{ name } </h1>

                    { (edit || forCreate) ? (
                            <>
                                <textarea 
                                value={header}
                                className='popupTicketInputD'
                                onChange={(e) => {
                                    onChangeState.call(this,e,"header");
                                }}
                                />

                                <hr/>

                                <textarea
                                value={body} 
                                className='popupTicketInputB'
                                onChange={(e) => {
                                    onChangeState.call(this,e,"body");
                                }}
                                />
                               { (forCreate) ? (
                                    <button 
                                    onClick={ this.handleCreate }
                                    > 
                                        Crear
                                    </button>
                                   ):(
                                    <button 
                                        onClick={ this.handleSave }
                                    > 
                                        Guardar 
                                    </button>
                                   )
                               }
                              
                            </>
                        ):(
                            <>
                                <p>{header}</p>

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

export default withRequest(PopupTicket);