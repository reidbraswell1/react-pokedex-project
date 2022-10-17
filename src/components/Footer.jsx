import React from "react";
import { useState } from "react";

function Footer(props) {

    const [ footerText, setFooterText ] = useState("React Pokedex Project 10/22");
    return (
        <div className="row mt-3">
            <footer className="col-5 mx-auto text-center footer">
                <span>{footerText}</span>
            </footer>
        </div>);
}
export default Footer;