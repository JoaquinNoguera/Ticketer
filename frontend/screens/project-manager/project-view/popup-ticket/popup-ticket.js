import React from 'react';
import Modal from '../../../../components/modal'
import { onChangeState } from '../../../../utils/utils';
import withRequest from '../../../../utils/requestService';
import ProjectContext from '../../project-context';
import ErrorModal from '../../../../components/error-modal';

import './styles.scss';

class PopupTicket extends React.Component {
    
    constructor(props) {
        super(props);
        
        const { name, body, header } = props;

        this.state = {
            edit: false,
            name: name,
            body: body,
            header: header,
            errors: []
        }
    }

    onChangeEdit = () => {
        this.setState((state)=>({
            edit: !state.edit
        }))
    }

    renderEditableComponents = () => {
        return <>
            <textarea 
            value={ this.state.header }
            className='popupTicketInputD'
            onChange={(e) => {
                onChangeState.call(this,e,"header");
            }}
            />

            <hr/>

            <textarea
            value={ this.state.body } 
            className='popupTicketInputB'
            onChange={(e) => {
                onChangeState.call(this,e,"body");
            }}
            />
        </>
    }

    renderCreateButton = (context) => {
        return <button 
        onClick={ 
            async () => { 
                try {
                    await context.handleTicketCreated(
                        this.state.header, this.state.body
                    );

                    this.props.onChangeShow();
                } catch (errors) {
                    this.setState({ errors });
                }
            }
        }
        > 
            Crear
        </button>
    }

    renderSaveButton = (context) => {
        return <button 
        onClick={ 
            async () => { 
                try {
                    await context.handleUpdateTicket(
                        this.props.id,
                        this.state.header,
                        this.state.body
                    );

                    this.props.onChangeShow();

                    this.setState(state => ({
                        edit: !state.edit
                    }));
                } catch (errors) {
                    this.setState({ errors });
                }
            }
        }
        > 
            Guardar 
        </button>
    }

    render(){
        const { show, onChangeShow, forCreate } = this.props;
        const { edit, name, body, header, errors } = this.state;

        return(
        <>
        <ErrorModal 
            show={ errors.length > 0 }
            onClose={ () => {
                this.setState({ errors: [] });
            }}
            message={ errors.length > 0 ? errors[0].message : '' }
        />
        <ProjectContext.Consumer>
            {
                context =>
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

                        { (edit || forCreate) ? <>
                            
                            { this.renderEditableComponents() }

                            { forCreate ?
                                this.renderCreateButton(context)
                                :
                                this.renderSaveButton(context)
                            }
                                
                        </>
                        :/* ELSE renderizar estático */
                        <>
                            <p>{ header }</p>

                            <hr/>

                            <p>{ body }</p>

                            <button 
                            onClick={this.onChangeEdit}
                            > 
                                Editar 
                            </button>
                        </>
                        }
                </Modal>
            }    
        </ProjectContext.Consumer>
        </>
        )
    }
}

export default withRequest(PopupTicket);