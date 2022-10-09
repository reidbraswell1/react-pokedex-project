import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "../components/table.jsx";
import Footer from "../components/footer.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type/index.js";

const Results = (props) => {

    console.log(`---Begin Function Results()---`);

    const params = useParams();
    console.log(`Props2.pokedexList =`, props.pokedexList);
    console.log(`Params.ids =`, params.ids);
    console.log(`Params.types =`, params.types);
    console.log(`Params.weaknesses =`, params.weaknesses);
    const getPokedexList = () => {
        console.log(`---Begin Function getPokedexList()---`);
    
        const BAD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.jsons"
        const GOOD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        let URL = "";
    
        // Set URL to the good url or bad based on the errTest prop
        /*
        if(errorTest) {
            URL = BAD_URL;
        }
        else {
            URL = GOOD_URL;
        }
        */
        fetch(GOOD_URL)
            .then((response) => {
                if(response.ok) { 
                    return response.json()
                }
                else {
                    throw new Error("Unknown Network Error Has Occurred");
                }
            })
            .then((data) => {
                console.log(`Data=`,data);
                pokedexList = data.pokemon;
            })
            .catch((err) => { 
                console.log(`${err} fetching from URL: ${URL}`);
                //setList([]);
                //setErrorText(`${err} fetching from URL: ${URL}`);
            });
        console.log(`---End Function getPokedexList()---`);
      }
    let pokedexList = props.pokedexList.pokemon;
    if(pokedexList.length == 0) {
        getPokedexList();
    }
    const ids = params.ids.split(",");
    const types = params.types.split(",");
    const weaknesses = params.weaknesses.split(",");
    let pokemonResults = [];
    ids.map((id, idx, array) => {
        console.log("Loop id =",id)
        console.log("Before Push = ",pokedexList.pokemon);
        pokedexList.forEach((pokemon, idx, array) => {
            if(pokemon.id.toString() === id.toString()) {
                pokemonResults.push(pokemon);
            }
        })
    })
    console.log(`Ids =`, ids);
    console.log(`Types =`, types);
    console.log(`Weaknesses =`, weaknesses);
    console.log(`Pokemons =`, pokemonResults);

    const location = useLocation();
    const navigate = useNavigate();
    console.log(`Location.state=`, location)

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        console.log(`---End Function useEffect()---`)
    }, []);

    console.log(`---End Function Results()---`);

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4 mx-auto">
                    <h1 className="color-white text-center">Pokemon List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-7 mx-auto">

                    {/*<Table pokemons={pokemonResults} pokemonImages={location.state.pokemonImages} ids={params.ids} weaknesses={params.weaknesses} types={params.types}></Table>*/}
                    <Table pokemons={pokemonResults} ids={params.ids} weaknesses={params.weaknesses} types={params.types}></Table>
                    <div className="row">
                        <div className="col-7 mx-auto">
                            {/*
                            {location.state != null && location.state.errorText.length > 0 &&
                                <div>
                                    <p className="error"><span className="color-red">{location.state.errorText}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterNames}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterTypes}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterWeaknesses}</span></p>
                                </div>
                            }
                            {location.state != null && location.state.filterText.length > 0 &&
                                <div>
                                    <p className="error"><span className="color-white">{location.state.filterText}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterNames}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterTypes}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterWeaknesses}</span></p>
                                </div>
                            }
                        */}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>);
}
export { Results };