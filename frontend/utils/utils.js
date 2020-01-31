export const categories = {
    PENDING: 0,
    TAKEN: 1,
    SOLVED: 2,
} 

export function onChangeState(e,option) {
    this.setState({
        [option]: e.target.value,
    }
    );
}
