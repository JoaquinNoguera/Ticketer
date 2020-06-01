import React from 'react';
import ConfirmationModal from '../confirmation-modal';

export default class ConfirmationButton extends React.Component {

    state = {
        showDialog: false
    }

    render() {
        const { children, onConfirm, message, ...otherProps } = this.props;

        return <>
            <ConfirmationModal
                show={this.state.showDialog}
                onConfirm={() => { this.setState({ showDialog: false }); onConfirm(); }}
                onCancel={() => this.setState({ showDialog: false })}
                message={message}
            />

            <button
                onClick={() => this.setState({ showDialog: true })}
                {...otherProps}
            >
                {children}
            </button>
        </>
    }
}