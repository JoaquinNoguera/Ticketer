import React from 'react';
import Modal from '../../../../components/modal'
import {onChangeState} from '../../../../utils/utils';
import './styles.scss';

export default class PopupTicket extends React.Component {
    
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

    render(){
        const { show, onChangeShow, forCreate, addTiket } = this.props;
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
                                    onClick={() => {
                                        addTiket({
                                            id: id,
                                            header: header,
                                            body: body,
                                            category: 0,
                                        })
                                    }}
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