import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//import { filterFilmsByDirector } from "../helpers/film.helpers.js";
//import { getListOf } from "../helpers/film.helpers.js";
//import { getFilmStats } from "../helpers/film.helpers.js";
import Footer from "../components/footer.jsx";
import UnorderedList from "../components/unorderedList.jsx";
import Table from "../components/table.jsx";
import { derivePokemonTypes, derivePokemonWeaknesses } from "../utils/pokemonUtils.js";

// Pokedex Page Main Function
const PokedexPage = (props) => {

    console.log(`---Begin Function PokedexPage()---`);

    const [ pokedexList, setPokedexList ] = useState({"pokemon":[{}]});
    const [ types, setTypes ] = useState([]);
    const [ weaknesses, setWeaknesses ] = useState([]);
    const [ errorText, setErrorText ] = useState("");
    const [ errorTest, setErrorTest ] = useState(false);
    //const [ searchDirector, setSearchDirector ] = useState("All");
    //const [ directors, setDirectors ] = useState([]);

    useEffect(function () {
        console.log(`---Begin useEffect()---`);
        getPokedexList();
        console.log(`---End useEffect()---`);
    }, []);

    const getPokedexList = () => {
        console.log(`---Begin PokedexPage getPokedexIndex()---`);
 
        const BAD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.jsons"
        const GOOD_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
        let URL = "";

        // Set URL to the good url or bad based on the errTest prop
        if(errorTest) {
            URL = BAD_URL;
        }
        else {
            URL = GOOD_URL;
        }
        fetch(URL)
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
                setPokedexList(data);
                let weaknesses = derivePokemonWeaknesses(data.pokemon);
                let types = derivePokemonTypes(data.pokemon);
                console.log(`Weaknesses=`,weaknesses);
                console.log(`Types=`,types);
                setWeaknesses(weaknesses);
                setTypes(types);
                setErrorText("");
            })
            .catch((err) => { 
                console.log(`${err} fetching from URL: ${URL}`);
                //setList([]);
                setErrorText(`${err} fetching from URL: ${URL}`);
            });
        console.log(`---End PokedexPage getPokedexList()---`);
    }
    console.log(`PokedexList=`,pokedexList);
    console.log(`PokedexListPokemon=`,pokedexList.pokemon)
    let pokemonTest = pokedexList.pokemon;
   
    return(
    <div className="container">
        <div className="row">
            <div className="col-4 my-center">
                <h1 className="color-white">Pokedex List</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-5 my-center">
                <Table pokemons={pokedexList.pokemon}></Table>
                <p className="error"><span className="color-red">{errorText}</span></p>
            </div>
        </div>

        <div className="row">
            <div className="col-5 my-center">
                <Footer></Footer>
            </div>
        </div>      
    </div>);
}
export { PokedexPage };