import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import { React, useEffect, useState } from "react";
import { Navigate, Redirect, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/footer";

let mySeconds = 6;
let timeout = null;

const DetailsView = (props) => {

    console.log(`---Begin Function DetailsView()---`);
    const location = useLocation();
    const navigate = useNavigate();

    const [ seconds, setSeconds ] = useState(6);

    

    console.log(`Location.state`, location.state);

    let pokemon = null;
    let pokemonImages = null;
    if (location.state != null) {
        if ('pokemon' in location.state) {
            pokemon = location.state.pokemon;
        }
        if ('pokemonImages' in location.state) {
            pokemonImages = location.state.pokemonImages;
        }
    }

    console.log(`Pokemon`, pokemon);
    console.log(`PokemonImages`, pokemonImages);

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);

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
        console.log(`---End Function useEffect()---`);
    }, [])

    mySeconds = seconds;
    const startInterval = () => {
        
          timeout = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
            //mySeconds = mySeconds - 1
            console.log("seconds: ", seconds); // seconds always return 6 but mySeconds the updated value
            console.log("myseconds: ",mySeconds);
            if(mySeconds < 1) {
                clearInterval(timeout);
                navigate("/");
            }
          },1000);
    }
  

    return (
        <div className="container-fluid">
            {location.state != null &&
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
                                            <tr key="propert-value-table">
                                                <th scope="col">Property</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {Object.keys(pokemon).map((key, index, array) => {
                                            console.log(`Key =`,key, `Value =`,pokemon[key])
                                                return (<tr key={`tr-${index}`}>
                                                    <td key={`td-${index}-1`} className="first-letter">{key}:</td>
                                                    <td key={`td-${index}-2`}>{pokemon[key] === null ? "Null": typeof pokemon[key] === "object" ? JSON.stringify(pokemon[key]): pokemon[key].toString()}</td>
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
                                                            pokemon.next_evolution.map((value, index, array) => {
                                                                let id = parseInt(value.num);
                                                                console.log(`Id=`, id);
                                                                return (<tr key={`heading-next-evolution-${index}`}>
                                                                    <td>{value.num}</td>
                                                                    <td>{value.name}</td>
                                                                    <td><img className="mx-auto d-block" src={pokemonImages[id].img} width="40rem" alt="Pokemon"></img></td>
                                                                </tr>)
                                                            })}
                                                        {'prev_evolution' in pokemon &&
                                                            pokemon.prev_evolution.map((value, index, array) => {
                                                                let id = parseInt(value.num);
                                                                console.log(`Id=`, id);
                                                                return (<tr key={`heading-prev-evolution-${index}`}>
                                                                    <td>{value.num}</td>
                                                                    <td>{value.name}</td>
                                                                    <td><img className="mx-auto d-block" src={pokemonImages[id].img} width="40rem" alt="Pokemon"></img></td>
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
            {location.state === null &&
                <div>
                    <h1>location.state is null redirecting to Home page in 
                        <span id="counter" style={{"color":"red"}}> {mySeconds}</span> seconds
                    </h1>
                </div>
            }
        </div>
    )
}
export { DetailsView };