export const categories = {
    PENDING: 'PENDING',
    TAKEN: 'TAKEN',
    SOLVED: 'SOLVED',
}

export const ticketActions = {
    SOLVE: 'SOLVE',
    TAKE: 'TAKE',
    DROP: 'DROP',
    DELETE: 'DELETE'
}

export function onChangeState(e,option) {
    this.setState({
        [option]: e.target.value,
    }
    );
}
