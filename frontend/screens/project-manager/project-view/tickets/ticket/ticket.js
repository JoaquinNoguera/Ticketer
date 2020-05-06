import React from 'react';
import PopupTicket from '../../popup-ticket'
import ProjectContext from '../../../project-context';
import './styles.scss';
import ErrorModal from '../../../../../components/error-modal';

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
        }
    }
    
    onChangeShowPopup = () => {
        this.setState((state)=>({
            showPopup: !state.showPopup,
        }))
    }

    render() {
        const { id, name, header, body, status, owner } = this.props;
        const { showPopup } = this.state;
        return (
            <ProjectContext.Consumer>
                { context => {
                    const my = (owner === context.userName);

                    return  <div  
                                className="ticket"
                                onClick={ this.onChangeShowPopup }
                            >       

                                <div
                                    className={
                                        (my) ? 
                                            ("ticket__owner ticket__owner--active") 
                                                : 
                                            ("ticket__owner")
                                    }
                                >
                                    <span>
                                        {
                                            (my) ? 
                                                ( "tuyo") 
                                                    : 
                                                (`de: ${ owner }`)
                                        }
                                    </span>
                                </div>
                                
                                <h2> 
                                    #{ name } 
                                </h2>
                                
                                <p
                                    className="text"
                                >
                                    { header }
                                </p>


                                <PopupTicket 
                                    id={ id }
                                    name={ name }
                                    show={ showPopup }
                                    status = {status}
                                    owner = {my}
                                    body={ body }
                                    header={ header }
                                    onChangeShow={ this.onChangeShowPopup }
                                    onEdited={ this.props.onEdited }
                                />
                            </div>
                }}
            </ProjectContext.Consumer>
        );
    }
}

export default Ticket