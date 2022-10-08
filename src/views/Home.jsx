import React, { useEffect } from "react";
//import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { filterPokemon } from "../utils/pokemonUtils";

const HomePage = (props) => {

    console.log(`---Begin Function HomePage()---`);
    console.log(`Props`, props);
    const navigate = useNavigate();

    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        console.log(results);
        console.log(results.length);

        //navigate("/results",{state:{results},replace:true})
        console.log(`---Begin Function useEffect()---`);
    }, [results])

    const processSubmission = (event) => {
        event.preventDefault();
        console.log(`Event`, event);
        const pokemonName = document.getElementById("pokemon-name");
        let pokemonSelectedNamesArray = [];
        for (let i = 0, count = 0; i < pokemonName.options.length; i++) {
            if (pokemonName.options[i].selected) {
                pokemonSelectedNamesArray[count] = pokemonName.options[i].value;
                count++;
            }
        }
        const pokemonType = document.getElementById("pokemon-type");
        let pokemonSelectedTypesArray = [];
        for (let i = 0, count = 0; i < pokemonType.options.length; i++) {
            if (pokemonType.options[i].selected) {
                pokemonSelectedTypesArray[count] = pokemonType.options[i].value;
                count++;
            }
        }
        const pokemonWeakness = document.getElementById("pokemon-weakness");
        let pokemonSelectedWeaknessesArray = [];
        for (let i = 0, count = 0; i < pokemonWeakness.options.length; i++) {
            if (pokemonWeakness.options[i].selected) {
                pokemonSelectedWeaknessesArray[count] = pokemonWeakness.options[i].value;
                count++;
            }
        }
        console.log(`PokemonSelectedNames=`, pokemonSelectedNamesArray);
        console.log(`PokemonSelectedTypes=`, pokemonSelectedTypesArray);
        console.log(`PokemonSelectedWeaknesses=`, pokemonSelectedWeaknessesArray);
        let filteredPokemon = filterPokemon({ "name": pokemonSelectedNamesArray, "type": pokemonSelectedTypesArray, "weaknesses": pokemonSelectedWeaknessesArray }, props.pokemonList.pokemon)
        console.log(`FilteredPokemonList=`, filteredPokemon);
        let errorMsg = "";
        let errorNames = "";
        let errorTypes = "";
        let errorWeaknesses = "";
        let filterMsg = "";
        let filterNames = "";
        let filterTypes = "";
        let filterWeaknesses = "";
        if (filteredPokemon.length > 0) {
            setResults(filteredPokemon);
            filterMsg = "Search Criteria:"
        }
        else {
            errorMsg = `No Data For Selected Filters:`;
        }
        if (pokemonSelectedNamesArray.length === 1 && pokemonSelectedNamesArray[0] === "All") {
            filterNames = `Names: ${pokemonSelectedNamesArray}`
        }
        else {
            let pokemonNames = [];
            pokemonSelectedNamesArray.forEach((element, index) => {

                pokemonNames.push(props.pokemonNames[index].name);
            })
            filterNames = `Names: ${pokemonNames.toString().replace(/,/g, ", ")}`;
        }
        filterTypes = `Types: ${pokemonSelectedTypesArray}`;
        filterWeaknesses = `Weaknesses: ${pokemonSelectedWeaknessesArray}`;

        let filteredPokemonIds = [];
        filteredPokemon.forEach((obj, index, array) =>{
            filteredPokemonIds.push(obj.id)
        })

        navigate(`/results/${filteredPokemonIds}/${pokemonSelectedTypesArray}/${pokemonSelectedWeaknessesArray}`, { state: { pokemons: filteredPokemon, pokemonImages: props.pokemonImages, errorText: errorMsg, filterText: filterMsg, filterNames: filterNames, filterTypes: filterTypes, filterWeaknesses: filterWeaknesses, weaknesses: pokemonSelectedWeaknessesArray, type: pokemonSelectedTypesArray } });
    }

    const resetLinks = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case "pokemon-name-reset":
                document.getElementById("pokemon-name").selectedIndex = 0;
                break;
            case "pokemon-type-reset":
                document.getElementById("pokemon-type").selectedIndex = 0;
                break;
            case "pokemon-weakness-reset":
                document.getElementById("pokemon-weakness").selectedIndex = 0;
                break;
            default:
                console.log(`Unknown Reset Event`, event.target.id);
                break;
        }
    }

    console.log(`---End Function HomePage()---`);

    return (<div className="container-fluid">
        <div className="row">
            <div className="col-4 my-center border rounded pb-3 pt-3">
                <form className="" onSubmit={processSubmission}>
                    <div className="form-group">
                        <label className="color-white" htmlFor="pokemonName">Pokemon Name</label>
                        <select className="form-select" id="pokemon-name" name="pokemonName" aria-label="Pokemon Name" multiple="true">
                            <option id="pokemon-name-all" value="All" selected="true">All</option>
                            {props.pokemonNames.map((value, index, array) => {
                                return (<option id={`pokemon-name-${index}`} value={value.id}>{value.name}</option>)
                            })}
                        </select>
                        <div class="text-center border mt-2 background-color-white">
                            <button className="reset-link" id="pokemon-name-reset" onClick={resetLinks}>Reset</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="color-white" for="pokemonType">Pokemon Type</label>
                        <select className="form-select" id="pokemon-type" name="pokemonType" aria-label="Pokemon Type" multiple="true">
                            <option id="pokemon-type-all" value="All" selected="true">All</option>
                            {props.pokemonTypes.map((value, index, array) => {
                                return (<option id={`pokemon-type-${index}`} value={value}>{value}</option>)
                            })}
                        </select>
                        <div class="text-center border mt-2 background-color-white">
                            <button className="reset-link" id="pokemon-type-reset" onClick={resetLinks}>Reset</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="color-white" for="pokemonWeakness">Pokemon Weakness</label>
                        <select className="form-select" id="pokemon-weakness" name="pokemonWeakness" aria-label="Pokemon Weakness" multiple="true">
                            <option id="pokemon-weakness-all" value="All" selected="true">All</option>
                            {props.pokemonWeaknesses.map((value, index, array) => {
                                return (<option id={`pokemon-weakness-${index}`} value={value}>{value}</option>)
                            })}
                        </select>
                        <div class="text-center border mt-2 background-color-white">
                            <button className="reset-link" id="pokemon-weakness-reset" onClick={resetLinks}>Reset</button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
        {/*
                results.length > 0 && <Navigate to="/results" results={results} state={results}></Navigate>}
                                */}

    </div>)
}
export { HomePage };