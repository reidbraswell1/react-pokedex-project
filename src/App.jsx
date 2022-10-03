import { React, useEffect, useState } from "react";
import { BrowserRouter, NavLink, Redirect, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./App.css";
import { PokedexPage } from "./pages/pokedex.page.jsx";
import { HomePage } from "./views/Home.jsx";
import { Results } from "./views/Results.jsx";
import { DetailsView } from "./views/Details.jsx";
import { getPokemonNames } from "./utils/pokemonUtils";
import { getPokemonTypes } from "./utils/pokemonUtils";
import { getPokemonWeaknesses } from "./utils/pokemonUtils";

const App = (props) => {

  //const { pathname } = useLocation();
  console.log(`---Begin Function App()---`);
  console.log(`Props=`,props);

  const [ pokedexList, setPokedexList ] = useState({"pokemon":[{"id":"0","num":"000","name":"Name","type":["Type"],"weaknesses":["Weaknesses"],"img":"https://static.vecteezy.com/system/resources/previews/000/440/566/original/vector-picture-icon.jpg"}]});
  const [ types, setTypes ] = useState([]);
  const [ weaknesses, setWeaknesses ] = useState([]);
  const [ names, setNames ] = useState([{"id":0,"name":""}]);
  const [ errorText, setErrorText ] = useState("");
  const [ errorTest, setErrorTest ] = useState(false);
  
  useEffect(() => {
    console.log(`---Begin useEffect()---`);
    getPokedexList();
    console.log(`---End useEffect()---`)
  },[]);

  const getPokedexList = () => {
    console.log(`---Begin Function getPokedexList()---`);

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
            let weaknesses = getPokemonWeaknesses(data.pokemon);
            let types = getPokemonTypes(data.pokemon);
            let names = getPokemonNames(data.pokemon);
            console.log(`Weaknesses=`,weaknesses);
            console.log(`Types=`,types);
            console.log(`Names=`,names);
            setWeaknesses(weaknesses);
            setTypes(types);
            setNames(names);
            setErrorText("");
        })
        .catch((err) => { 
            console.log(`${err} fetching from URL: ${URL}`);
            //setList([]);
            setErrorText(`${err} fetching from URL: ${URL}`);
        });
    console.log(`---End Function getPokedexList()---`);
  }
  console.log(`---End Function App()---`);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-light">
        <ul id="nav-items" className="navbar-nav">
          <li id="nav-item-home" className="nav-item">
            <NavLink className={({isActive}) => (isActive ? "nav-link color-white active" : "nav-link color-white not-active")} to="/" end>Home</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        {/*
          <Route exact path="/" element={<PokedexPage pokemonList={pokedexList}></PokedexPage>} end></Route>
        */}
          <Route exact path="/" element={<HomePage pokemonNames={names} pokemonTypes={types} pokemonWeaknesses={weaknesses} pokemonList={pokedexList}></HomePage>} end></Route>
          <Route path="/results" element={<Results props={props.results}></Results>}></Route>
          <Route path="/Details/:id" element={<DetailsView name="Details_Page"></DetailsView>}></Route>
      </Routes>
    </BrowserRouter>
  )
};
export default App;
