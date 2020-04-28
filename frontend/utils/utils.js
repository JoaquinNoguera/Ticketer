export const categories = {
    PENDING: 'PENDING',
    TAKEN: 'TAKEN',
    SOLVED: 'SOLVED',
} 

export function onChangeState(e,option) {
    this.setState({
        [option]: e.target.value,
    }
    );
}
