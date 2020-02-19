import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {categories} from '../../utils/utils';
import PopupTicket from './popup-ticket'
import Tickets from './tickets';
import './styles.scss'

class ProyectView extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            tikets: [
                    {
                        id: 1,
                        description: "Lorem Ipsum is simply dummy text of the.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.PENDING,
                    },
                    {
                        id: 2,
                        description: "It has survived not only fIpsum.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.PENDING,
                    },
                    {
                        id: 3,
                        description: "Contrary to popular boubtable source.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.PENDING,
                    },
                    {
                        id: 4,
                        description: 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Fihe Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.PENDING,
                    },
                    {
                        id: 5,
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.TAKEN,
                    },
                    {
                        id: 6,
                        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.TAKEN,
                    },
                    {
                        id: 7,
                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.TAKEN,
                    },
                    {
                        id: 8,
                        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                        category: categories.TAKEN,
                    },
            ],
            option: categories.PENDING,
            showCreate: false
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

    addTiket = (newTicket) => {
       console.log(newTicket);
       this.setState((state)=>({
           tikets: [...state.tikets, newTicket],
           showCreate: false,
       }))
    }
    render () {
        const {tikets,option, showCreate} = this.state;
        return (
            <div id='proyect_view'>
                <h2> Titulo del proyecto </h2>

                <div id="proyect_view-actions">
                    <Link to={`/project/${ this.props.match.params.projectId }/settings`} ><button> Configurar (solo creador) </button></Link>
                    <Link to='/projects' ><button> Volver al dashboard </button></Link>
                </div>

                <Tickets
                    tikets={tikets}
                    option ={option}
                    changeOption = {this.changeOption}
                />

                <div 
                    id='proyect_view-add_ticket'
                    onClick = {this.onChangeShow}
                > 
                + </div>
                <PopupTicket
                    show={showCreate}
                    forCreate = {true}
                    addTiket = {this.addTiket}
                    onChangeShow = {this.onChangeShow}
                />
            </div>
        );
    }
}

export default withRouter(ProyectView);