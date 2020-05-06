import React from 'react';
import { Link} from 'react-router-dom';
import { categories } from '../../../utils';
import PopupTicket from './popup-ticket'
import Tickets from './tickets';
import ProjectContext from '../project-context';

import './styles.scss'

class ProjectView extends React.Component {
    
    constructor(props){
        super(props);
        const {owner} = props;
        this.state = {
            owner: owner,
            showCreate: false,
            option: categories.PENDING
        }
    }

    onChangeShow = () => {
        this.setState((state) => ({
            showCreate: !state.showCreate,
        }))
    }
    changeOption = (option) => {
        this.setState({
            option: option,
        })
    }


    render () {
        const { option, showCreate, owner } = this.state;
        return (
        <ProjectContext.Consumer>
            {
                context=>  
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    {
                        (owner 
                            && 
                            <Link 
                            to={`/project/${ context.projectId }/settings`} 
                            >
                            <button
                                className="secondary"
                            > 
                                Configurar
                            </button>
                        </Link>
                        )
                    }
                    
                    <Link to='/projects' >
                        <button
                            className="secondary"
                        > 
                            Volver 
                        </button>
                    </Link>
                
                </div>

                <Tickets
                    option={ option }
                    changeOption={ this.changeOption }
                />

                <button 
                    id='proyectView-add'
                    className="primary"
                    onClick={ this.onChangeShow }
                > 
                    + 
                </button>

                <PopupTicket
                    show={ showCreate }
                    forCreate={ true }
                    onChangeShow={ this.onChangeShow }
                />

            </div>
            }
        </ProjectContext.Consumer>
        );
    }
}

export default ProjectView;