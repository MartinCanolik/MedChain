import React from "react";
import LogoAba from "../logos/LogoAba.jpg"

const Footer = () => {
    return (
        <footer className="h-full p-3">
            <div>
                <div className="h-1 bg-gradient-to-r from-med to-chain"></div>
                <img src={LogoAba} alt="" className="h-20 rounded-md m-3"/>
                <p className="text-white">American Blockchain Assosiation</p>
            </div>
        </footer>
    )
}

export default Footer;
