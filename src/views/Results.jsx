import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "../components/table.jsx";
import Footer from "../components/footer.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type/index.js";
import { getPokedexList, getPokemonNames } from "../utils/pokemonUtils.js";
import ErrorBoundary from "react-error-boundary";

const Results = (props) => {

    console.log(`---Begin Function ${Results.name}()---`);

    const [pokedexList, setPokedexList] = useState([]);
    const [pokemonResults, setPokemonResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Init Message");

    const params = useParams();
    
    console.log(`${Results.name} Params.ids =`, params.ids);
    console.log(`${Results.name} Prarams.names =`, params.names);
    console.log(`${Results.name} Params.types =`, params.types);
    console.log(`${Results.name} Params.weaknesses =`, params.weaknesses);

    const ids = params.ids.split(",");
    const names = params.names.split(",");
    const types = params.types.split(",");
    const weaknesses = params.weaknesses.split(",");
   
    console.log(`${Results.name} Ids =`, ids);
    console.log(`${Results.name} Types =`, types);
    console.log(`${Results.name} Weaknesses =`, weaknesses);
    console.log(`${Results.name} Pokemons =`, pokemonResults);

    const location = useLocation();
    const navigate = useNavigate();

    console.log(`${Results.name} Location.state=`, location)

    useEffect(() => {
        console.log(`---Begin Function ${useEffect.name}()---`);
        if (pokedexList.length === 0) {
            let results = getPokedexList(false);
                results.then((reslts) => {
                    if ('data' in reslts) {
                        if (reslts.data === null) {
                            console.log(`${useEffect.name} Results.data is null =`, reslts.data)
                        }
                        else {
                            console.log(`${useEffect.name} Results.data not null =`, reslts.data);
                            if ('pokemon' in reslts.data) {
                                console.log(`${useEffect.name} Results.data.pokemon =`, reslts.data.pokemon);
                                setPokedexList(reslts.data.pokemon.slice(0));
                                let tempArray = [];
                                ids.map((id, idx, array) => {
                                    reslts.data.pokemon.forEach((pokemon, idx, array) => {
                                        if (pokemon.id.toString() === id.toString()) {
                                            tempArray.push(pokemon);
                                        }
                                    })
                                })
                                setPokemonResults(tempArray.slice(0));
                                setIsLoading(false);
                            }
                            else {
                                console.log(`${useEffect.name} Pokemon not in results`);
                            }
                        }
                    }
                    if('err' in reslts) {
                        console.log(`${useEffect.name} Results Error =`, reslts.err);
                        setErrorMessage(reslts.err.toString());
                        setIsError(true);
                    }
                })
                results.catch((error) => {
                    console.log(`${useEffect.name}() Promise Error =`,error);
                });
        }
        console.log(`---End Function ${useEffect.name}()---`)
    }, []);
    console.log(`---End Function ${Results.name}()---`);


    return (
        <div className="container-fluid">
            {isLoading && !isError &&
                <div className="row">
                    <div className="col-4 mx-auto">
                        <h1 className="text-center">...Fetching Data...</h1>
                    </div>
                </div>
            }
            {!isLoading && !isError &&
                <div>
                    <div className="row">
                        <div className="col-4 mx-auto">
                            <h1 className="color-white text-center">Pokemon List</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7 mx-auto">
                            {(ids.length >= 1 && ids[0] !== "none") &&
                                <Table pokemons={pokemonResults} ids={ids} types={types} weaknesses={weaknesses}></Table>
                            }
                            <div className="row">
                                <div className="col-7 mx-auto">

                                    {(ids.length === 1 && ids[0] === "none") &&
                                        <div>
                                            <p className="error"><span className="color-red">Error Search Criteria Not Found:</span></p>
                                            <p className="error"><span className="color-red">Names: {names.toString().replace(/,/g, ", ")}</span></p>
                                            <p className="error"><span className="color-red">Types: {types.toString()}</span></p>
                                            <p className="error"><span className="color-red">Weaknesses: {weaknesses.toString()}</span></p>
                                        </div>
                                    }

                                    {(ids.length >= 1 && ids[0] !== "none") &&
                                        <div>
                                            <p className="error"><span className="color-white">Search Criteria:</span></p>
                                            <p className="error"><span className="color-white">Names: {names.toString().replace(/,/g, ", ")}</span></p>
                                            <p className="error"><span className="color-white">Types: {types.toString()}</span></p>
                                            <p className="error"><span className="color-white">Weaknesses: {weaknesses.toString()}</span></p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <Footer></Footer>
                        </div>
                    </div>
                </div>
            }
            {isError && 
                <p className="text-danger">{errorMessage}</p>
            }
        </div>);
}
export { Results };