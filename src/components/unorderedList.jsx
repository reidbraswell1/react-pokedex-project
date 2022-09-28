import React from "react";
import { useState } from "react";

const UnorderedList = (props) => {

    return(<ul className="list-group">
            {props.pokemons.map((value, index, array) => {
                return (<li className="list-group-item" key={value.id} id={value.id}>
                    {`${value.id}.`} {value.name}, {value.type}, '{value.weaknesses.toString()}'
                    <img className="border border-rounded" style={{marginLeft:".5rem", padding:"2px"}} width="35rem" src={value.img}></img>
                    </li>)
                })
            }
        </ul>);
}
export default UnorderedList;