import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "../components/table.jsx";
import Footer from "../components/footer.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type/index.js";
import { getPokedexList } from "../utils/pokemonUtils.js";

const Results = (props) => {

    console.log(`---Begin Function Results()---`);

    const [pokedexList2, setPokedexList2] = useState(props.pokedexList.pokemon);

    const params = useParams();
    console.log(`Props.pokedexList =`, props.pokedexList.pokemon);
    console.log(`Params.ids =`, params.ids);
    console.log(`Params.types =`, params.types);
    console.log(`Params.weaknesses =`, params.weaknesses);

    let pokedexList = props.pokedexList.pokemon;
    if (pokedexList.length === 0) {
        let results = getPokedexList()
        .then((results) => {
            if ('data' in results) {
                if (results.data === null) {
                    console.log(`Results.data is null =`, results.data)
                }
                else {
                    console.log(`Results.data not null =`, results.data);
                    if ('pokemon' in results.data) {
                        console.log(`Results.data.pokemon =`, results.data.pokemon);
                        pokedexList=(results.data.pokemon);
                    }
                    else {
                        console.log("Pokemon not in results");
                    }
                }
            }
            else {
                console.log("Data not in results");
            }
        });
    }
    const ids = params.ids.split(",");
    const types = params.types.split(",");
    const weaknesses = params.weaknesses.split(",");
    let pokemonResults = [];
    ids.map((id, idx, array) => {
        pokedexList.forEach((pokemon, idx, array) => {
            if (pokemon.id.toString() === id.toString()) {
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
        if (pokedexList2.length === 0) {
            let results = getPokedexList()
                .then((results) => {
                    if ('data' in results) {
                        if (results.data === null) {
                            console.log(`Results.data is null =`, results.data)
                        }
                        else {
                            console.log(`Results.data not null =`, results.data);
                            if ('pokemon' in results.data) {
                                console.log(`Results.data.pokemon =`, results.data.pokemon);
                                setPokedexList2(results.data.pokemon);
                            }
                            else {
                                console.log("Pokemon not in results");
                            }
                        }
                    }
                    else {
                        console.log("Data not in results");
                    }
                });
        }
        console.log(`---End Function useEffect()---`)
    }, []);
    const changeState = () => {
        setPokedexList2(new Array({ "name": "Josh" }));

    }
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
                    <Table pokemons={pokemonResults} ids={ids} types={types} weaknesses={weaknesses}></Table>
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
                            */}
                                <div>
                                    <p className="error"><span className="color-white">Search Criteria:</span></p>
                                    <p className="error"><span className="color-white">Names:</span>
                                    <ul className="color-white">
                                        {pokemonResults.map((pokemon, idx, array) => {
                                            return idx < pokemonResults.length-1 ? <li key={`li-${idx}`}>{`${pokemon.name}(${pokemon.id}), `}</li> : <li key={`li-${ids}`}>{` ${pokemon.name}(${pokemon.id})`}</li>
                                        })}
                                    </ul>
                                    </p>
                                    <p className="error"><span className="color-white">Types: {types.toString()}</span></p>
                                    <p className="error"><span className="color-white">Weaknesses: {weaknesses.toString()}</span></p>
                                </div>
                            <ul>
                                {pokedexList2.map((element, idx, array) => {
                                    return <li key={idx}>{element.name}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>);
}
export { Results };