import React from 'react';
import './styles.scss'
import PopupTicket from '../../popup-ticket'

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        this.onChangeShow = this.onChangeShow.bind(this);
    }
    
    onChangeShow(){
        this.setState((state)=>({
            show: !state.show,
        }))
    }

    render(){
        const {id, description, body} = this.props;
        const {show} = this.state;
        return (
            <>
            <div className='proyect_view-tickets-ticket' onClick={this.onChangeShow}>
                <h2> #{id} </h2>
                <p> {description} </p>
                <PopupTicket 
                    id={id}
                    show={show}
                    body={body}
                    description={description}
                    onChangeShow = {this.onChangeShow}
                />
            </div>
            </>
        );
    }
}

export default Ticket