import React from 'react';

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
                    const body = JSON.parse(options.body);
                    
                    if (body.username === 'admin' &&  body.password === 'admin')
                        return {
                            id: 123,
                            name: 'Usuario'
                        }
                    else
                        throw {
                            code: 401,
                            message: 'Credenciales incorrectas'
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




