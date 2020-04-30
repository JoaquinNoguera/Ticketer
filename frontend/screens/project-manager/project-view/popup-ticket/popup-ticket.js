import React from 'react';
import Modal from '../../../../components/modal'
import { onChangeState } from '../../../../utils/utils';
import './styles.scss';
import withRequest from '../../../../utils/requestService';
import ProjectContext from '../../project-context';

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

    handleSave = (projectId) => {
        this.setState(state => ({
            edit: !state.edit
        }));

        this.props.httpRequest(`/api/projects/${ projectId }/tickets/${ this.props.id }`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                action: 'CHANGE',
                value: {
                    header: this.state.header,
                    body: this.state.body
                }
            })
        })
        .then(this.props.onEdited)
        .catch(_ => {});
    }

    render(){
        const { show, onChangeShow, forCreate } = this.props;
        const { edit, name, body, header } = this.state;

        return(
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
                                    onClick={ async()=>{   
                                        await context.handleTicketCreated(
                                            header,body
                                        );
                                        this.props.onChangeShow();
                                    }}
                                    > 
                                            Crear
                                        </button>
                                    ):(
                                        <button 
                                        onClick={ async()=>{
                                            await this.handleSave(context.projectId);
                                        } }
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
            }    
        </ProjectContext.Consumer>
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