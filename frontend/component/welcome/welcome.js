import React from 'react';
import './style.scss';
import { withRouter } from "react-router";

function Welcome(props) {
    const {history} = props;

    function goLoggin(){
        history.push('/loggin')
    }


    function goSingIn(){
        history.push('/singin')
    }


    return(
        <div className="welcomeContainer">
            
            <div 
                className="welcomeContainerText"
            >
                <h1>
                    Tiketer
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut convallis lectus, sed tincidunt sem. Vivamus sed aliquet ligula. Praesent eget purus vel purus hendrerit ultricies non vel odio. Phasellus sem mi, pharetra a fermentum non, lobortis id sapien. Nulla et augue sed neque volutpat tristique. Nunc fringilla ipsum sed metus consequat, vel congue augue fermentum. Ut ut porta urna, a cursus mi. Nam vel cursus felis. Nulla hendrerit est sit amet nibh iaculis, ut faucibus tellus mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
                </p>
            </div>
            
            <button 
                className="
                    welcomeBotton
                    welcomeBottonLoggin
                "
                onClick={goLoggin}
            >
                        Loggin
            </button>
            
            <button 
                className="
                    welcomeBotton
                    welcomeBottonSingIn
                "
                onClick={goSingIn}
            >
                        Sing In
            </button>
            
            <span
                className="
                welcomeSpan
                "
            >
                @coppyright
            </span>
        </div>
    )
}

export default withRouter(Welcome);