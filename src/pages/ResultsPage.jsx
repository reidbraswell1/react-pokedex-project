import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type/index.js";
import { getPokedexList, getPokemonNames } from "../utils/pokemonUtils.js";
import ErrorBoundary from "react-error-boundary";

const ResultsPage = (props) => {

    console.log(`---Begin Function ${ResultsPage.name}()---`);

    const [pokedexList, setPokedexList] = useState([]);
    const [pokemonResults, setPokemonResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Init Message");

    const params = useParams();

    console.log(`${ResultsPage.name} Params.ids =`, params.ids);
    console.log(`${ResultsPage.name} Prarams.names =`, params.names);
    console.log(`${ResultsPage.name} Params.types =`, params.types);
    console.log(`${ResultsPage.name} Params.weaknesses =`, params.weaknesses);

    const ids = params.ids.split(",");
    const names = params.names.split(",");
    const types = params.types.split(",");
    const weaknesses = params.weaknesses.split(",");

    console.log(`${ResultsPage.name} Ids =`, ids);
    console.log(`${ResultsPage.name} Types =`, types);
    console.log(`${ResultsPage.name} Weaknesses =`, weaknesses);
    console.log(`${ResultsPage.name} Pokemons =`, pokemonResults);

    const location = useLocation();
    const navigate = useNavigate();

    console.log(`${ResultsPage.name} Location.state=`, location)

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
                if ('err' in reslts) {
                    console.log(`${useEffect.name} Results Error =`, reslts.err);
                    setErrorMessage(reslts.err.toString());
                    setIsError(true);
                }
            })
            results.catch((error) => {
                console.log(`${useEffect.name}() Promise Error =`, error);
            });
        }
        console.log(`---End Function ${useEffect.name}()---`)
    }, []);
    console.log(`---End Function ${ResultsPage.name}()---`);


    return (
        <div className="container-fluid">
            {isLoading && !isError &&
                <div className="row">
                    <div className="col-4 mx-auto">
                        <h1 className="text-center">...Loading...</h1>
                    </div>
                </div>
            }
            {!isLoading && !isError &&
                <div>
                    <div className="row">
                        <h1 className="color-white text-center">
                            <i class="bi bi-arrow-left-square-fill" onClick={() => navigate(-1)}></i>&nbsp;&nbsp;
                            {props.pageTitle}</h1>
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
export { ResultsPage };