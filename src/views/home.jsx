import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { processSubmission } from "../utils/pokemonUtils";

const HomePage = (props) => {

    console.log(`---Begin Function HomePage()---`);
    console.log(`Props`,props);
    console.log(`Props.Names`,props.names);

    return(<div className="container-fluid">
                <div className="row">
                    <div className="col-4 my-center border rounded pb-3 pt-3">
                        <form className="" onSubmit={processSubmission}>
                            <div className="form-group">
                                <label className="color-white" htmlFor="pokemonName">Pokemon Name</label>
                                <select className="form-select" id="pokemon-name" name="pokemonName" aria-label="Pokemon Name" multiple="true">
                                    <option id="pokemon-name-all" value="All" selected="true">All</option>
                                    { props.names.map((value, index, array) => {
                                        return(<option id={`pokemon-name-${index}`} value={value.id}>{value.name}</option>)
                                    })}
                                </select>
                                <p>Ctrl Selects Multiple Values</p>
                            </div>
                            <div className="form-group">
                                <label className="color-white" for="pokemonType">Pokemon Type</label>
                                <select className="form-select" id="pokemon-type" name="pokemonType" aria-label="Pokemon Type" multiple="true">
                                    <option id="pokemon-type-all" value="All" selected="true">All</option>
                                    { props.types.map((value, index, array) => {
                                        return(<option id={`pokemon-type-${index}`} value={value}>{value}</option>)
                                    })}
                                </select>
                                <p>Ctrl Selects Multiple Values</p>
                            </div>
                            <div className="form-group">
                                <label className="color-white" for="pokemonWeakness">Pokemon Weakness</label>
                                <select className="form-select" id="pokemon-weakness" name="pokemonWeakness" aria-label="Pokemon Weakness" multiple="true">
                                    <option id="pokemon-weakness-all" value="All" selected="true">All</option>
                                    { props.weaknesses.map((value, index, array) => {
                                        return(<option id={`pokemon-weakness-${index}`} value={value}>{value}</option>)
                                    })}
                                </select>
                                <p>Ctrl Selects Multiple Values</p>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>)
}
export { HomePage };