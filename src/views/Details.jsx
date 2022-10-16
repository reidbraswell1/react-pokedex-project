import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import { React, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { getPokedexList } from "../utils/pokemonUtils";

let mySeconds = 6;
let timeout = null;

const DetailsView = (props) => {

    console.log(`---Begin Function ${DetailsView.name}()---`);

    const params = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    console.log(`${DetailsView.name} Props =`, props);
    console.log(`${DetailsView.name} Params =`, params);
    console.log(`${DetailsView.name} Location =`, location);

    const [pokemon, setPokemon] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [seconds, setSeconds] = useState(6);

    useEffect(() => {
        console.log(`---Begin Function ${useEffect.name}()---`);
        getPokedexList()
            .then((results) => {
                if ('data' in results) {
                    if (results.data === null) {
                        console.log(`${useEffect.name} Results.data is null =`, results.data)
                    }
                    else {
                        console.log(`${useEffect.name} Results.data not null =`, results.data);
                        if ('pokemon' in results.data) {
                            console.log(`${useEffect.name} Results.data.pokemon =`, results.data.pokemon);
                            const reslt = (results.data.pokemon);
                            reslt.forEach((obj, idx, array) => {
                                if (obj.id.toString() === params.id.toString()) {
                                    //pokemon.push(obj);
                                    setPokemon(obj);
                                }
                            })
                            setPokemons(reslt);
                            console.log(`${useEffect.name} Pokemon =`, pokemon);
                            setIsLoading(false);
                        }
                        else {
                            console.log(`${useEffect.name} Pokemon not in results`);
                        }
                    }
                }
                else {
                    console.log(`${useEffect.name} Data not in results`);
                }
            })

        /*
        if (location.state === null) {
           return () => {
            console.log(`---Begin useEffect Callback Function Null State---`);
            startInterval();
            console.log(`---End useEffect Callback Function Null State---`);
           }
           //navigate("/");
        }
        return () => {
            console.log(`---Begin useEffect Callback Function Non Null State---`);
            console.log(`---End useEffect Callback Function Non Null State---`);
        }
        */
        console.log(`---End Function ${useEffect.name}()---`);
    }, [])

    mySeconds = seconds;
    const startInterval = () => {

        timeout = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
            //mySeconds = mySeconds - 1
            console.log("seconds: ", seconds); // seconds always return 6 but mySeconds the updated value
            console.log("myseconds: ", mySeconds);
            if (mySeconds < 1) {
                clearInterval(timeout);
                navigate("/");
            }
        }, 1000);
    }

    return (
        <div className="container-fluid">
            {isLoading &&
                <div className="row">
                    <div className="col-4 mx-auto">
                        <h1>...Loading...</h1>
                    </div>
                </div>
            }
            {!isLoading &&
                <div>
                    <div className="row">
                        <div className="col-4 mx-auto">
                            <h1 className="color-white text-center">{pokemon.name} Details</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div class="row">
                                <div class="col-7 mx-auto">
                                    <img className="mx-auto d-block" src={pokemon.img} alt="Pokemon"></img>
                                    <table className="table table-sm table-striped table-bordered background-color-white caption-top">
                                        <caption className="color-white text-center">Property Value</caption>
                                        <thead>
                                            <tr key="property-value-table">
                                                <th scope="col">Property</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(pokemon).map((key, index, array) => {
                                                return (<tr key={`tr-${index}`}>
                                                    <td key={`td-${index}-1`} className="first-letter">{key}:</td>
                                                    <td key={`td-${index}-2`}>{pokemon[key] === null ? "Null" : typeof pokemon[key] === "object" ? JSON.stringify(pokemon[key]) : pokemon[key].toString()}</td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="col-5 my-center">
                                            {('next_evolution' in pokemon) &&
                                                <table className="table table-sm table-striped table-bordered background-color-white caption-top">
                                                    <caption className="color-white text-center">Next Evolution:</caption>
                                                    <thead>
                                                        <tr key="heading-next-evolution">
                                                            <th scope="col">Num</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Image</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        {pokemon.next_evolution.map((obj1, index, array) => {
                                                            let id = parseInt(obj1.num);
                                                            return (<tr key={`heading-next-evolution-${index}`}>
                                                                <td>{obj1.num}</td>
                                                                <td>{obj1.name}</td>
                                                                <td>{pokemons.map((obj2, idx, array) => {
                                                                    if (obj2.num.toString() === obj1.num.toString()) {
                                                                        return (
                                                                            <a href={`/Details/${parseInt(obj1.num)}`}>
                                                                                <img className="border rounded imgLink mx-auto d-block" src={obj2.img} width="40rem" alt="Pokemon"></img>
                                                                            </a>
                                                                        )
                                                                    }
                                                                })}
                                                                </td>
                                                            </tr>)
                                                        })}

                                                    </tbody>
                                                </table>
                                            }
                                            {('prev_evolution' in pokemon) &&
                                                <table className="table table-sm table-striped table-bordered background-color-white caption-top">
                                                    <caption className="color-white text-center">Prev Evolution:</caption>
                                                    <thead>
                                                        <tr key="heading-next-evolution">
                                                            <th scope="col">Num</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Image</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        {pokemon.prev_evolution.map((obj1, index, array) => {
                                                            let id = parseInt(obj1.num);
                                                            return (<tr key={`heading-next-evolution-${index}`}>
                                                                <td>{obj1.num}</td>
                                                                <td>{obj1.name}</td>
                                                                <td>{pokemons.map((obj2, idx, array) => {
                                                                    if (obj2.num.toString() === obj1.num.toString()) {
                                                                        return (
                                                                            <a href={`/Details/${parseInt(obj1.num)}`}>
                                                                                <img className="border rounded imgLink mx-auto d-block" src={obj2.img} width="40rem" alt="Pokemon"></img>
                                                                            </a>
                                                                        )
                                                                    }
                                                                })}
                                                                </td>
                                                            </tr>)
                                                        })}
                                                    </tbody>
                                                </table>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer></Footer>
                        </div>
                    </div>
                </div>
            }
            {/*location.state === null &&
                <div>
                    <h1>location.state is null redirecting to Home page in 
                        <span id="counter" style={{"color":"red"}}> {mySeconds}</span> seconds
                    </h1>
                </div>
            */}
        </div>
    )
}
export { DetailsView };