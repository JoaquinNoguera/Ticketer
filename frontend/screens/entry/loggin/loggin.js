import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';


export default function Loggin(props){
    return(
        <div className="logginContainer">
            <h2>Loggin into Tiketer</h2>
            <form
                className="
                    logginForm
                "
            >
                <span>Username</span>
                <input 
                    placeholder="pedrito matagatos"
                    className="
                        logginInput
                    "
                />
                
                <span>Password</span>
                <input 
                    type="password" 
                    placeholder="********"
                    className="
                        logginInput
                    "
                />
                
                <Link to='/proyects'><button 
                    type="submit"
                    className="
                        logginButton
                    "
                >
                    Login
                </button></Link>
            </form>
        </div>
    )
}