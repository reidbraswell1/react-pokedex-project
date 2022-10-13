import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import { React, useEffect, useState } from "react";
import { Link, Navigate, Redirect, useLocation, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { getPokedexList } from "../utils/pokemonUtils";

let mySeconds = 6;
let timeout = null;

const DetailsView = (props) => {

    console.log(`---Begin Function DetailsView()---`);

    const params = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    console.log(`Props =`, props);
    console.log(`Params =`, params);
    console.log(`Location =`, location);

    const [pokemon, setPokemon] = useState([]);
    const [pokemons, setPokemons] = useState([]);

    const [seconds, setSeconds] = useState(6);

    /*
    let pokemons = [];
    if('pokemon' in props.pokedexList) {
        pokemons = props.pokedexList.pokemon;
    }
    */
    if ('pokemon' in props.pokedexList) {
        //setPokemons(props.pokedexList.pokemon);
    }

    /*
    let pokemon=[];
    if(location.state !== null) {
        if('pokemon' in location.state) {
            pokemon = location.state.pokemon;
        }
    }
    else {
        getPokedexList()
        .then((results) => {
            if ('data' in results) {
                if (results.data === null) {
                    console.log(`Results.data is null =`, results.data)
                }
                else {
                    console.log(`Results.data not null =`, results.data);
                    if ('pokemon' in results.data) {
                        console.log(`Results.data.pokemon =`, results.data.pokemon);
                        console.log("Params.id=",params.id);
                        pokemons = (results.data.pokemon);
                        pokemons.forEach((obj, idx, array) => {
                            if(obj.id.toString() === params.id.toString()) {
                                pokemon.push(obj);
                            }
                        })
                        console.log("Pokemon=",pokemon);
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

    }
    */

    console.log(`Pokemon`, pokemon);

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        getPokedexList()
            .then((results) => {
                if ('data' in results) {
                    if (results.data === null) {
                        console.log(`Results.data is null =`, results.data)
                    }
                    else {
                        console.log(`Results.data not null =`, results.data);
                        if ('pokemon' in results.data) {
                            console.log(`Results.data.pokemon =`, results.data.pokemon);
                            console.log("Params.id=", params.id);
                            const reslt = (results.data.pokemon);
                            reslt.forEach((obj, idx, array) => {
                                if (obj.id.toString() === params.id.toString()) {
                                    //pokemon.push(obj);
                                    setPokemon(obj);
                                }
                            })
                            setPokemons(reslt);
                            console.log("Pokemon=", pokemon);
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
        console.log(`---End Function useEffect()---`);
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
            <div>
                <div className="row">
                    <div className="col-4 mx-auto">
                        <h1 className="color-white text-center">{pokemon.name}Details</h1>
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
                                            console.log(`Key =`, key, `Value =`, pokemon[key])
                                            return (<tr key={`tr-${index}`}>
                                                <td key={`td-${index}-1`} className="first-letter">{key}:</td>
                                                <td key={`td-${index}-2`}>{pokemon[key] === null ? "Null" : typeof pokemon[key] === "object" ? JSON.stringify(pokemon[key]) : pokemon[key].toString()}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                                <div className="row">
                                    <div className="col-5 my-center">
                                        {('next_evolution' in pokemon || 'prev_evolution' in pokemon) &&
                                            <table className="table table-sm table-striped table-bordered background-color-white caption-top">
                                                {'next_evolution' in pokemon &&
                                                    <caption className="color-white text-center">Next Evolution:</caption>
                                                }
                                                {'prev_evolution' in pokemon &&
                                                    <caption className="color-white text-center">Prev Evolution:</caption>
                                                }
                                                <thead>
                                                    <tr key="heading-next-evolution">
                                                        <th scope="col">Num</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    {'next_evolution' in pokemon &&
                                                        pokemon.next_evolution.map((obj1, index, array) => {
                                                            let id = parseInt(obj1.num);
                                                            console.log(`Id=`, id);
                                                            return (<tr key={`heading-next-evolution-${index}`}>
                                                                <td>{obj1.num}</td>
                                                                <td>{obj1.name}</td>
                                                                <td>{pokemons.map((obj2, idx, array) => {
                                                                    if (obj2.num.toString() === obj1.num.toString()) { 
                                                                        return (<Link to={`/Details/${parseInt(obj1.num)}`}>
                                                                        <img className="mx-auto d-block" src={obj2.img} width="40rem" alt="Pokemon"></img>
                                                                        </Link>)
                                                                    }
                                                                })}
                                                                </td>
                                                            </tr>)
                                                        })}
                                                    {'prev_evolution' in pokemon &&
                                                        pokemon.prev_evolution.map((obj1, index, array) => {
                                                            let id = parseInt(obj1.num);
                                                            console.log(`Id=`, id);
                                                            return (<tr key={`heading-prev-evolution-${index}`}>
                                                                <td>{obj1.num}</td>
                                                                <td>{obj1.name}</td>
                                                                {pokemons.map((obj2, idx2, array) => {
                                                                    console.log(`obj2.id=`, obj2.id)
                                                                    console.log(`obj1 =`, obj1)
                                                                    if (obj2.num.toString() === obj1.num.toString()) {
                                                                        return <td>
                                                                            <Link to={`/Details/${parseInt(obj1.num)}`}>
                                                                            <img className="mx-auto d-block" src={obj2.img} width="40rem" alt="Pokemon"></img>
                                                                            </Link>
                                                                            </td>
                                                                            
                                                                    }
                                                                })}
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