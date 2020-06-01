import React from 'react';

export default function withRequest(WrappedComponent){
    return class extends React.Component {

        mounted = true;

        errorHandlerFactory = (handler) => {
            return error => {
                if (this.mounted)
                    handler(error);
            }
        }

        httpRequest = async function (url, options) {
            if (!options) options = {}

            if (!options.headers) options.headers = new Headers();

            if (!options.headers['Content-Type'])
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json'
                }

            try {
                
                const response = await fetch(url, options);
                
                const responseBody = await response.json();
                
                if (!response.ok) {
                    if ((response.status === 403 || response.status === 401) && window.on401)
                        window.on401()

                    throw responseBody;
                }
                else {
                    console.log('Server responded: ', responseBody);
        
                    return responseBody;
                }
            } catch (error) {
                console.error(error);
                
                throw error;
            }
        
        }

        componentWillUnmount() {
            this.mounted = false;
        }
    
        render(){
            return(
                <WrappedComponent 
                    httpRequest = { this.httpRequest }
                    errorHandler = { this.errorHandlerFactory }
                    { ...this.props }
                />
            );
        }
            
        
    }
}




