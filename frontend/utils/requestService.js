import React from 'react';
import { categories } from './utils'

export default function withRequest(WrappedComponent){
    return class extends React.Component {
        httpRequest = async function (url, options) {
            if (!options) options = {}

            if (!options.headers) options.headers = new Headers();

            if (!options.headers['Content-Type'])
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json'
                }

            try {
                
                if (!options) options = {}

                if (!options.headers) options.headers = new Headers();
    
                if (!options.headers['Content-Type'])
                    options.headers = {
                        ...options.headers,
                        'Content-Type': 'application/json'
                    }
                
                const response = await fetch(url,options);
                
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
    
        
        
        render(){
            return(
                <WrappedComponent 
                    httpRequest = { this.httpRequest }
                    { ...this.props }
                />
            );
        }
            
        
    }
}




