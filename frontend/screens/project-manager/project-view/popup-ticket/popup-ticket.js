import React from 'react';
import Modal from '../../../../components/modal'
import { onChangeState } from '../../../../utils/utils';
import withRequest from '../../../../utils/requestService';
import ProjectContext from '../../project-context';
import ErrorModal from '../../../../components/error-modal';
import { categories as ticketStatus, ticketActions } from '../../../../utils';

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
            errors: null
        }
    }

    onChangeEdit = () => {
        this.setState((state)=>({
            edit: !state.edit
        }))
    }

    renderEditableComponents = () => {
        const {forCreate} = this.props;
        const {edit, body, header} = this.state;

        if(edit || forCreate) {
            return <div
                        className="popup__content"
                    >
                        <textarea 
                            className="header"
                            value={ header }
                            onChange={(e) => {
                            onChangeState.call(this,e,"header");
                        }}
                        />

                        <hr/>

                        <textarea
                            className="description"
                            value={ body } 
                            onChange={(e) => {
                            onChangeState.call(this,e,"body");
                        }}
                        />
                    </div>
        }else{
            return <div
                        className="popup__content"
                    >
                        <p> { header } </p>

                        <hr/>

                        <p> { body } </p>
                    </div>
        }

    }

    renderEditableButton = (context) =>{
        const {forCreate, owner, status} = this.props;
        const {edit} = this.state;
        if(!owner  && status === ticketStatus.TAKEN) return null;
        if(forCreate){
            return <button
                        className="secondary small" 
                        onClick={ 
                            async () => { 
                                try {
                                    await context.handleTicketCreated(
                                    this.state.header, this.state.body
                                    );
                                    this.onChangeShow();
                                } catch (errors) {
                                this.setState({ errors });
                                }
                            }
                        }
                    > 
                        Crear
                    </button>
        }
        if(edit){
                return <button
                            className="secondary small" 
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
                        </button>;
        }
        return <button
                    className="secondary small" 
                    onClick={this.onChangeEdit}
                > 
                    Editar 
                </button>
    }

    renderActionButton = (context) => {
        const {status, owner} = this.props;
        const {edit} = this.state;
        if( !owner  && status === ticketStatus.TAKEN ) return null;
        if(edit)  return   <div
                                id="popup-actions"
                            >
                                <h3> Editando... </h3>
                            </div>
        const actionButton =    {
            delete: <button
                        key="dalete"
                        className="warn small"
                        onClick={ event => {
                        event.stopPropagation();
                        context.handleTicketDeleted(this.props.name)
                        .catch(errors => this.setState( { errors }) );
                        }}
                    > 
                        x
                    </button>,

            take: <button
                        key="take"
                        className="primary small"
                        onClick={ (event) => {
                        event.stopPropagation();
                        context.handleTicketAction(this.props.id, ticketActions.TAKE)
                        .catch(errors => this.setState({ errors }));
                        }}
                    >
                        Tomar 
                    </button>,
    
            leave: <button 
                        key="leave"
                        className="primary small"
                        onClick={ (event) => {
                        event.stopPropagation();
                        context.handleTicketAction(this.props.id, ticketActions.DROP)
                        .catch(errors => this.setState({ errors }));
                        }}
                    > 
                        Dejar
                    </button>,

                    markSolved: <button
                                    key="markSolved"
                                    className= "primary small"
                                    onClick={ (event) => {
                                    event.stopPropagation();
                                    context.handleTicketAction(this.props.id, ticketActions.SOLVE)
                                    .catch(errors => this.setState({ errors }));
                                    }}
                                >
                                    Terminar
                                </button>,

                    restore: <button
                                key="restore"
                                className="primary small"
                                onClick={ (event) => {
                                event.stopPropagation();
                                context.handleTicketAction(this.props.id, ticketActions.DROP)
                                .catch(errors => this.setState({ errors }));
                                }}
                            > 
                             Restaurar 
                             </button>
        }
        const renderButtons = () => {
            switch(status) {
                case ticketStatus.PENDING:
                    return [ actionButton.take, actionButton.markSolved, actionButton.delete];
                case ticketStatus.TAKEN:
                    return [ actionButton.leave, actionButton.markSolved, actionButton.delete ];
                case ticketStatus.SOLVED:
                    return [ actionButton.take, actionButton.restore, actionButton.delete ];
                }}
        
         return <div
                    id="popup-actions"
                >
                    { renderButtons() }
                </div>
        
        }

        
    onChangeShow = () => {
        this.setState({
            edit:false
        });
        this.props.onChangeShow();
    }

    render(){
        const { show, forCreate} = this.props;
        const { name, errors } = this.state;
        console.log(errors);
        return(
        <>
        <ErrorModal 
            show={ errors !== null}
            onClose={ () => {
                this.setState({ errors: null });
            }}
            errors={ errors }
        />
        <ProjectContext.Consumer>
            {
                context =>  <Modal 
                id="popup-ticket"
                show = {show}
                onFocusLoss = {this.onChangeShow}
                >
                        <button
                            className="popup__ticket--close"
                            onClick={this.onChangeShow}
                        >
                            X
                        </button>

                        <h2> { (forCreate) ? ('Nuevo Ticket') : (`# ${name}`)} </h2>

                     
                        {this.renderActionButton(context)}
                        {this.renderEditableComponents()}
                        {this.renderEditableButton(context)}
                </Modal>
            }
        </ProjectContext.Consumer>
        </>
        )
    }
}

export default withRequest(PopupTicket);