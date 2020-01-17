import React from 'react';
import './style.scss';

export default function SingIn(){
    return(
        <div className="singinContainer">
            <h2>Sing In into Tiketer</h2>
            <form
                className="
                    singinForm
                "
            >
                <span>Username</span>
                <input 
                    placeholder="pedrito matagatos"
                    className="
                        singinInput
                    "
                />
                
                <span>Password</span>
                <input 
                    type="password" 
                    placeholder="********"
                    className="
                        singinInput
                    "
                />

                <span>Confirm Password</span>
                <input 
                    type="password" 
                    placeholder="********"
                    className="
                        singinInput
                    "
                />
                
                <button 
                    type="submit"
                    className="
                        singinButton
                    "
                >
                    Sing In
                </button>
            </form>
        </div>
    );
}