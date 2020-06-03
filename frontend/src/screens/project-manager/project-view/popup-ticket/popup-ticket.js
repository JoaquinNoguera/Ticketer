import React from 'react';
import Modal from '../../../../components/modal'
import { onChangeState } from '../../../../utils/utils';
import withRequest from '../../../../utils/requestService';
import ProjectContext from '../../project-context';
import ErrorModal from '../../../../components/error-modal';
import ConfirmModal from '../../../../components/confirm-modal';
import { categories as ticketStatus, ticketActions } from '../../../../utils';

import ConfirmationButton from '../../../../components/confirmation-button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle, faPlus, faCheck, faPen, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

class PopupTicket extends React.Component {

    constructor(props) {
        super(props);

        const { name, body, header } = props;
        this.state = {
            edit: false,
            name: name,
            body: (!body) ? "": body,
            header: header,
            errors: null,
            confirm: null,
        }
    }

    onChangeEdit = () => {
        this.setState((state) => ({
            edit: !state.edit
        }))
    }

    renderEditableComponents = () => {
        const { forCreate } = this.props;
        const { edit, body, header } = this.state;

        if (edit || forCreate) {
            return <div
                className="popup__content"
            >
                <textarea
                    placeholder="Ingrese el header"
                    className="header"
                    value={header}
                    onChange={(e) => {
                        onChangeState.call(this, e, "header");
                    }}
                />

                <hr />

                <textarea
                    placeholder="Ingrese la descripción"
                    className="description"
                    value={body}
                    onChange={(e) => {
                        onChangeState.call(this, e, "body");
                    }}
                />
            </div>
        } else {
            return <div
                className="popup__content"
            >
                <p> {header} </p>

                <hr />

                <p className="body"> {body} </p>
            </div>
        }

    }

    renderEditableButton = (context) => {
        const { forCreate, owner, status } = this.props;
        const { edit } = this.state;
        if (!owner && status === ticketStatus.TAKEN) return null;
        if (forCreate) {
            return <button
                className="secondary small"
                onClick={
                    async () => {
                        try {
                            await context.handleTicketCreated(
                                this.state.header, this.state.body
                            );
                            this.setState({
                                confirm: "El ticket se creo correctamente"
                            })
                            this.onChangeShow();
                        } catch (errors) {
                            this.setState({ errors });
                        }
                    }
                }
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className='mr1'
                />
                        Crear
                    </button>
        }
        if (edit) {
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
                                edit: !state.edit,
                                confirm: "El ticket se edito correctamente"
                            }));
                        } catch (errors) {
                            this.setState({ errors });
                        }
                    }
                }
            >
                <FontAwesomeIcon
                    icon={faSave}
                    className='mr1'
                />
                            Guardar
                        </button>;
        }
        return <button
            className="secondary small"
            onClick={this.onChangeEdit}
        >
            <FontAwesomeIcon
                icon={faPen}
                className='mr1'
            />
            Editar
        </button>
    }

    renderActionButton = (context) => {
        const { status, owner } = this.props;
        const { edit } = this.state;

        if (!owner && status === ticketStatus.TAKEN) return null;

        if (edit) return <div
            id="popup-actions"
        >
            <h3> Editando... </h3>
        </div>

        const actionButton = {
            delete: <ConfirmationButton
                key="delete"
                className="warn small"
                onConfirm={_ => {
                    context.handleTicketDeleted(this.props.id)
                        .catch(errors => this.setState({ errors }));
                }}
                message='¿Está seguro que desea borrar este ticket?'
            >
                <FontAwesomeIcon
                    icon={faTrash}
                />
            </ConfirmationButton>,

            take: <button
                key="take"
                className="primary small"
                onClick={(event) => {
                    event.stopPropagation();
                    context.handleTicketAction(this.props.id, ticketActions.TAKE)
                        .catch(errors => this.setState({ errors }));
                }}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className='mr1'
                />
                        Tomar
                    </button>,

            leave: <button
                key="leave"
                className="primary small"
                onClick={(event) => {
                    event.stopPropagation();
                    context.handleTicketAction(this.props.id, ticketActions.DROP)
                        .catch(errors => this.setState({ errors }));
                }}
            >
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    className='mr1'
                />
                        Dejar
                    </button>,

            markSolved: <button
                key="markSolved"
                className="primary small"
                onClick={(event) => {
                    event.stopPropagation();
                    context.handleTicketAction(this.props.id, ticketActions.SOLVE)
                        .catch(errors => this.setState({ errors }));
                }}
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    className='mr1'
                />
                            Terminar
                        </button>,

            restore: <button
                key="restore"
                className="primary small"
                onClick={(event) => {
                    event.stopPropagation();
                    context.handleTicketAction(this.props.id, ticketActions.DROP)
                        .catch(errors => this.setState({ errors }));
                }}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className='mr1'
                />
                        Restaurar
                    </button>
        }

        const renderButtons = () => {
            switch (status) {
                case ticketStatus.PENDING:
                    return [actionButton.take, actionButton.markSolved, actionButton.delete];
                case ticketStatus.TAKEN:
                    return [actionButton.leave, actionButton.markSolved, actionButton.delete];
                case ticketStatus.SOLVED:
                    return [actionButton.take, actionButton.restore, actionButton.delete];
            }
        }

        return <div
            id="popup-actions"
        >
            {renderButtons()}
        </div>

    }

    componentDidUpdate(prevProps) {
        if (prevProps.show && !this.props.show)
            this.setState({ name: this.props.name, body: this.props.body, header: this.props.header });
    }

    onChangeShow = () => {

        if (this.props.forCreate) {
            this.setState({
                edit: false,
                body: "",
                header: ""
            });
        } else {
            this.setState({
                edit: false,
            });
        }

        this.props.onChangeShow();
    }

    render() {
        const { show, forCreate } = this.props;
        const { name, errors, confirm } = this.state;
        return (
            <>
                <ErrorModal
                    show={errors !== null}
                    onClose={() => {
                        this.setState({ errors: null });
                    }}
                    errors={errors}
                />
                <ConfirmModal
                    show={confirm !== null}
                    onClose={() => {
                        this.setState({ confirm: null });
                    }}
                    message={confirm}
                />
                <ProjectContext.Consumer>
                    {
                        context => <Modal
                            id="popup-ticket"
                            show={show}
                            onFocusLoss={this.onChangeShow}
                        >
                            <button
                                className="popup__ticket--close"
                                onClick={this.onChangeShow}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                />
                            </button>

                            <h2> {(forCreate) ? ('Nuevo Ticket') : (`#${name}`)} </h2>


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