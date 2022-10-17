import React, { useEffect } from "react";
//import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { filterPokemon } from "../utils/pokemonUtils.js";
import { getPokedexList } from "../utils/pokemonUtils.js";
import { getPokemonNames } from "../utils/pokemonUtils.js";
import { getPokemonTypes } from "../utils/pokemonUtils.js";
import { getPokemonWeaknesses } from "../utils/pokemonUtils.js";

const HomePage = (props) => {

    console.log(`---Begin Function ${HomePage.name}()---`);
    console.log(`${HomePage.name} Props =`, props);
    const navigate = useNavigate();

    const [names, setNames] = useState([]);
    const [types, setTypes] = useState([]);
    const [weaknesses, setWeaknesses] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(`---Begin Function ${useEffect.name}()---`);
        let results = getPokedexList()
            .then((reslts) => {
                if ('data' in reslts) {
                    if (reslts.data === null) {
                        console.log(`Results.data is null =`, reslts.data)
                    }
                    else {
                        console.log(`Results.data not null =`, reslts.data);
                        if ('pokemon' in reslts.data) {
                            console.log(`Results.data.pokemon =`, reslts.data.pokemon);
                            let pokemonNames = getPokemonNames(reslts.data.pokemon.slice(0));
                            let pokemonTypes = getPokemonTypes(reslts.data.pokemon.slice(0));
                            let pokemonWeaknesses = getPokemonWeaknesses(reslts.data.pokemon.slice(0));
                            let pokemons = reslts.data.pokemon;
                            setNames(pokemonNames.slice(0));
                            setTypes(pokemonTypes.slice(0));
                            setWeaknesses(pokemonWeaknesses.slice(0));
                            setPokemonList(pokemons.slice(0));
                            setIsLoading(false);
                        }
                        else {
                            console.log("Pokemon not in results");
                        }
                    }
                }
                else {
                    console.log("Data not in results");
                }
            })
            .catch((error) => {
                console.log(`${useEffect.name} Promise Error =`, error);
            });
        console.log(`---End Function ${useEffect.name}()---`);
    }, [])

    const processSubmission = (event) => {
        console.log(`Begin Function ${processSubmission.name}()`);
        event.preventDefault();
        console.log(`${processSubmission.name} Event =`, event);
        const pokemonName = document.getElementById("pokemon-name");
        let pokemonSelectedNamesArray = [];
        for (let i = 0, count = 0; i < pokemonName.options.length; i++) {
            if (pokemonName.options[i].selected) {
                // Deselect all other options if All is selected
                if (i === 0 && pokemonName[i].selected) {
                    pokemonSelectedNamesArray[count] = pokemonName.options[i].value
                    for (let j = 1; j < pokemonName.options.length; j++) {
                        pokemonName.options[j].selected = false;
                    }
                }
                else {
                    pokemonSelectedNamesArray[count] = pokemonName.options[i].value;
                    count++;
                }
            }
        }
        const pokemonType = document.getElementById("pokemon-type");
        let pokemonSelectedTypesArray = [];
        for (let i = 0, count = 0; i < pokemonType.options.length; i++) {
            if (pokemonType.options[i].selected) {
                // Deselect all other options if All is selected
                if (i === 0 && pokemonType[i].selected) {
                    pokemonSelectedTypesArray[count] = pokemonType.options[i].value
                    for (let j = 1; j < pokemonType.options.length; j++) {
                        pokemonType.options[j].selected = false;
                    }
                }
                else {
                    pokemonSelectedTypesArray[count] = pokemonType.options[i].value;
                    count++;
                }
            }
        }
        const pokemonWeakness = document.getElementById("pokemon-weakness");
        let pokemonSelectedWeaknessesArray = [];
        for (let i = 0, count = 0; i < pokemonWeakness.options.length; i++) {
            if (pokemonWeakness.options[i].selected) {
                // Deselect all other options if All is selected
                if (i === 0 && pokemonWeakness[i].selected) {
                    pokemonSelectedWeaknessesArray[count] = pokemonWeakness.options[i].value
                    for (let j = 1; j < pokemonWeakness.options.length; j++) {
                        pokemonWeakness.options[j].selected = false;
                    }
                }
                else {
                    pokemonSelectedWeaknessesArray[count] = pokemonWeakness.options[i].value;
                    count++;
                }
            }
        }
        console.log(`${processSubmission.name} PokemonSelectedNames =`, pokemonSelectedNamesArray);
        console.log(`${processSubmission.name} PokemonSelectedTypes =`, pokemonSelectedTypesArray);
        console.log(`${processSubmission.name}PokemonSelectedWeaknesses =`, pokemonSelectedWeaknessesArray);
        let filteredPokemon = filterPokemon({ "name": pokemonSelectedNamesArray, "type": pokemonSelectedTypesArray, "weaknesses": pokemonSelectedWeaknessesArray }, pokemonList);
        console.log(`${processSubmission.name} FilteredPokemonList =`, filteredPokemon);
        let errorMsg = "";
        let errorNames = "";
        let errorTypes = "";
        let errorWeaknesses = "";
        let filterMsg = "";
        let filterNames = "";
        let filterTypes = "";
        let filterWeaknesses = "";
        if (filteredPokemon.length > 0) {
            //setResults(filteredPokemon);
            filterMsg = "Search Criteria:"
        }
        else {
            errorMsg = `No Data For Selected Filters:`;
        }
        if (pokemonSelectedNamesArray.length === 1 && pokemonSelectedNamesArray[0] === "All") {
            filterNames = pokemonSelectedNamesArray.toString();
        }
        else {
            let pokemonNames = [];
            pokemonSelectedNamesArray.forEach((element, index) => {

                names.forEach((name, idx, array) => {
                    if (element.toString() === name.id.toString()) {
                        pokemonNames.push(name.name);
                    }
                })
            })
            filterNames = `${pokemonNames.toString()}`;
        }
        filterTypes = `Types: ${pokemonSelectedTypesArray}`;
        filterWeaknesses = `Weaknesses: ${pokemonSelectedWeaknessesArray}`;

        let filteredPokemonIds = [];
        filteredPokemon.forEach((obj, index, array) => {
            filteredPokemonIds.push(obj.id)
        })

        if (filteredPokemonIds.length === 0) {
            navigate(`/Results/none/${pokemonSelectedNamesArray}/${pokemonSelectedTypesArray}/${pokemonSelectedWeaknessesArray}`);
        }
        else {
            navigate(`/Results/${filteredPokemonIds}/${filterNames}/${pokemonSelectedTypesArray}/${pokemonSelectedWeaknessesArray}`);
        }
    }

    const resetLinks = (event) => {
        console.log(`---Begin Function ${resetLinks.name}()---`);
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
        console.log(`---End Function ${resetLinks.name}()---`)
    }

    console.log(`---End Function ${HomePage.name}()---`);

    return (<div className="container-fluid">
        <div className="row">
            <h1 className="text-center color-white">{props.pageTitle}</h1>
            <div className="col-4 my-center border rounded pb-3 pt-3">
                <form className="" onSubmit={processSubmission}>
                    <div className="form-group">
                        <label className="color-white" htmlFor="pokemonName">Pokemon Name</label>
                        <select className="form-select" id="pokemon-name" name="pokemonName" aria-label="Pokemon Name" multiple="true">
                            {isLoading &&
                                <option id="names-loading">...Fetching Data...</option>
                            }
                            {!isLoading &&
                                <option id="pokemon-name-all" value="All" selected="true">All</option>
                            }
                            {names.map((value, index, array) => {
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
                            {isLoading &&
                                <option id="types-loading">...Fetching Data...</option>
                            }
                            {!isLoading &&
                                <option id="pokemon-name-all" value="All" selected="true">All</option>
                            }
                            {types.map((value, index, array) => {
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
                            {isLoading &&
                                <option id="weaknesses-loading">...Fetching Data...</option>
                            }
                            {!isLoading &&
                                <option id="pokemon-name-all" value="All" selected="true">All</option>
                            }
                            {weaknesses.map((value, index, array) => {
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
    </div>)
}
export { HomePage };