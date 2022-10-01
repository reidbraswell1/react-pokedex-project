import React from "react";
import { useEffect } from "react";
import Footer from "../components/footer.jsx";
import Table from "../components/table.jsx";

// Pokedex Page Main Function
const PokedexPage = (props) => {

    console.log(`---Begin Function PokedexPage()---`);
    console.log(`PokedexPageProps=`,props);

    useEffect(function () {
        console.log(`---Begin useEffect()---`);
        //getPokedexList();
        console.log(`---End useEffect()---`);
    }, []);
    console.log(`---End Function PokedexPage()---`);

    return(
    <div className="container">
        <div className="row">
            <div className="col-4 my-center">
                <h1 className="color-white">Pokedex List</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-5 my-center">
                <Table pokemons={props.pokemonList.pokemon}></Table>
                <p className="error"><span className="color-red">{props.errorText}</span></p>
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