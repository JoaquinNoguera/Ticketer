import React from 'react';
import {categories} from './utils'

export default function withRequest(WrappedComponent){
    return class extends React.Component {
        httpRequest = async function (url, options) {
            try {
                const response = await fetch(url, options);
        
                const responseBody = await response.json();
        
                if (!response.ok)
                    throw responseBody;
                else {
                    console.log('Server responded: ', responseBody);
        
                    return responseBody;
                }
            } catch (error) {
                console.error(error);
                
                throw error;
            }
        
        }
        
        mockHttpRequest = async function(url, options) {
            const waitFor = ms => (new Promise(resolve => setTimeout(resolve, ms)));
        
            /*
            if (!!window.on401){
                window.on401();
                throw {
                    code: 401,
                    message: 'No se ha autenticado'
                }
            }
            */
        
            await waitFor(250);
        
            switch (url) {
                case '/api/login':
                    {
                        const body = JSON.parse(options.body);
                        if (body.username === 'admin' &&  body.password === 'admin')
                            return {
                                id: 123,
                                name: 'Usuario'
                            }
                        else{
                            throw {
                                code: 401,
                                message: 'Credenciales incorrectas'
                            }
                        }
                    }
                
                case '/api/singin':
                    {
                        const body = JSON.parse(options.body);
                        if( body.password !== body.repeat) {
                            throw {
                                code: 400,
                                message: 'Contraseñas distintas'
                            }
                        }else {
                            return {
                                id: 122,
                                name: body.username
                            }
                        }
                    }
                case '/api/projects':
                {  
                    const method = options.method;
                      switch (method) {
                        case 'GET':
                            return ([
                                { id: 1, name: 'Tu puta madre' },
                                { id: 3, name: 'Tu puta madre re entangada' },
                                { id: 67, name: 'El nuevo Facebook' },
                                { id: 101, name: 'Dominacion mundial' }
                            ]);   
                    }
                }
                case '/api/project': {
                    const method = options.method;
                    switch(method) {
                        case 'GET':
                            return(
                                [
                                    {
                                        id: 1,
                                        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                                        category: categories.PENDING,
                                    },
                                    {
                                        id: 2,
                                        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                                        category: categories.PENDING,
                                    },
                                    {
                                        id: 3,
                                        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
                                        body: "Quisque ultricies placerat justo id interdum. Curabitur non laoreet eros. Aenean auctor felis ac porta scelerisque. Proin laoreet ante dui, eget ultrices elit fringilla pulvinar. Proin at eros at neque bibendum consectetur in non lectus. Vivamus vulputate bibendum nulla id ullamcorper. Curabitur molestie tortor sit amet dapibus elementum. Nam pellentesque leo pretium nibh ultrices, at mollis neque rutrum. In hac habitasse platea dictumst. Vivamus semper sem in porttitor lacinia. Donec sem elit, eleifend aliquam dictum non, sodales vitae elit. Sed turpis lectus, semper ac elit eget, scelerisque consectetur mi. Sed luctus, elit et iaculis cursus, odio augue fermentum est, eget aliquet tellus mi quis est. Nulla suscipit enim a placerat feugiat. Morbi ultricies nulla nec dolor ullamcorper, ac lobortis turpis condimentum. Aliquam mattis auctor erat vel vehicula. Nullam sit amet mollis lorem. Vestibulum lacus elit, maximus ac nunc eu, mollis auctor sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris feugiat, sem at consequat aliquet, odio metus bibendum diam, at facilisis nulla dolor nec augue. Maecenas eu leo vel felis commodo placerat. Quisque laoreet sit amet diam id varius. Sed et convallis quam, in finibus mauris. Duis fringilla tellus leo, at convallis eros dignissim eu. Pellentesque ut arcu vel sem aliquet pretium ac sed ante. Nunc quis rhoncus risus. Donec ornare sit amet ante ac tincidunt. Fusce et commodo dui. Maecenas velit tortor, porta nec mi vel, interdum viverra ipsum. Cras at sapien nulla. Donec congue est id tellus maximus, eget consequat quam sollicitudin. Etiam et malesuada mi. Duis quis aliquet arcu, nec placerat urna. In ac justo elit. Sed ac congue justo, id scelerisque mi. Aliquam ac cursus sapien. Curabitur tempor ornare sem suscipit vestibulum. Aenean sit amet purus ultricies, rutrum risus vel, auctor mi. Praesent molestie nibh ac felis accumsan, ut cursus leo eleifend. Proin vehicula magna eu turpis pulvinar sollicitudin. Phasellus non eleifend est. Vestibulum mi risus, aliquet in urna sit amet, posuere accumsan ligula. Quisque non turpis cursus, fringilla eros ut, aliquam urna. Maecenas eu magna feugiat, lacinia ante sit amet, viverra elit.",
                                        category: categories.PENDING,
                                    },
                                    {
                                        id: 4,
                                        description: 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
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
                            ]
                            )
                    }
                }
            }
        }
        
        
        render(){
            return(
                <WrappedComponent 
                    httpRequest = {this.mockHttpRequest}
                    {...this.props}
                />
            );
        }
            
        
    }
}




