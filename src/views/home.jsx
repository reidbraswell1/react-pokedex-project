import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = (props) => {

    console.log(`---Begin Function HomePage()---`);
    console.log(`Props`,props);
    console.log(`Props.Names`,props.names);

    return(<div className="container-fluid">
                <div className="row">
                    <div className="col-5 my-center">
                        <form>
                            <div className="form-group">
                                <label for="pokemonName">Pokemon Name</label>
                                <select className="form-select" id="pokemon-name" name="pokemonName" aria-label="Pokemon Name">
                                    <option id="pokemon-name-all" value="All" selected="true">All</option>
                                    { props.names.map((value, index, array) => {
                                        return(<option id={`pokemon-name-${index}`} value={value.id}>{value.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="pokemonType">Pokemon Type</label>
                                <select className="form-select" id="pokemon-type" name="pokemonType" aria-label="Pokemon Type" multiple="true">
                                    <option id="pokemon-type-all" value="All" selected="true">All</option>
                                    { props.types.map((value, index, array) => {
                                        return(<option id={`pokemon-type-${index}`} value={value}>{value}</option>)
                                    })}
                                </select>
                                <p>Ctrl Selects Multiple Values</p>
                            </div>
                            <div className="form-group">
                                <label for="pokemonWeakness">Pokemon Weakness</label>
                                <select className="form-select" id="pokemon-weakness" name="pokemonWeakness" aria-label="Pokemon Weakness" multiple="true">
                                    <option id="pokemon-weakness-all" value="All" selected="true">All</option>
                                    { props.weaknesses.map((value, index, array) => {
                                        return(<option id={`pokemon-weakness-${index}`} value={value}>{value}</option>)
                                    })}
                                </select>
                                <p>Ctrl Selects Multiple Values</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)
}
export { HomePage };