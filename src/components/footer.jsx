import React from "react";
import { useState } from "react";

function Footer(props) {

    const [ footerText, setFooterText ] = useState("React Router Hooks 9/22");
    return (
        <div className="row mt-3">
            <footer className="col-5 my-center footer">
                <span>{footerText}</span>
            </footer>
        </div>);
}
export default Footer;