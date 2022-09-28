import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//import { filterFilmsByDirector } from "../helpers/film.helpers.js";
//import { getListOf } from "../helpers/film.helpers.js";
//import { getFilmStats } from "../helpers/film.helpers.js";
import { Link } from "react-router-dom";
import Footer from "../components/footer.jsx";

// Pokedex Page Main Function
function PokedexPage(props) {

    console.log(`---Begin Function PokedexPage()---`);

    const [ pokedexList, setPokedexList ] = useState({"pokemon":[{}]});
    const [ errorText, setErrorText ] = useState("");
    const [ errorTest, setErrorTest ] = useState(false);
    //const [ searchDirector, setSearchDirector ] = useState("All");
    //const [ directors, setDirectors ] = useState([]);

    useEffect(function () {
        console.log(`---Begin useEffect()---`);
        getPokedexList();
        console.log(`---End useEffect()---`);
    }, []);

    function getPokedexList() {
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
                //const directors = getListOf(data, "director");
                //console.log(`Directors=`,directors);
                //setDirectors(directors);
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
    /*
    try {
        pokedexList.pokemon.map((value, index, array) => {
            console.log(value.name);
        })
    }
    catch(err) {
        console.log(`Error`,err);
    }
    */
    //let filmsByDirector = filterFilmsByDirector(list, searchDirector);
    //let filmStats = getFilmStats(filmsByDirector);
    //console.log(`Film Stats=`, filmStats);
    //let { total, avg_score, latest } = filmStats;

    pokedexList.pokemon.map((value, index, array) => {
        console.log('Value',value);
    })
    return(
    <div className="container">
        <div className="row">
            <div className="col-4 my-center">
                <h1 className="color-white">Pokedex List</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-5 my-center">
                <h4 className="text-center color-white">Pokemon</h4>
                <ul className="list-group">
                {pokedexList.pokemon.map((value, index, array) => {
                        return (<li className="list-group-item" key={value.id} id={value.id}>{`${value.id}.`} {value.name} <img width="35rem" src={value.img}></img></li>)
                        })
                }
                </ul>
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