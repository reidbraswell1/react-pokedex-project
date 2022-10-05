import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import { React, useEffect } from "react";
import { Navigate, Redirect, useLocation, useNavigate } from "react-router-dom";

const DetailsView = (props) => {

    console.log(`---Begin Function DetailsView()---`);
    const location = useLocation();
    const navigate = useNavigate();

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
            setTimeout(() => {
                navigate("/");
            }, 5000)
        }
        console.log(`---End Function useEffect()---`);
    }, [])

    return (
        <div className="container-fluid">
            {location.state != null &&
                <div>
                    <div className="row">
                        <div className="col-4 mx-auto border">
                            <h1 className="color-white text-center">{pokemon.name} Details</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm border">
                            <div class="row">
                                <div class="col-7 mx-auto border">
                                    <img className="border mx-auto d-block" src={pokemon.img} alt="Pokemon"></img>
                                    <table className="table table-sm table-striped table-bordered background-color-white caption-top">
                                        <caption className="color-white text-center">Property Value</caption>
                                        <thead>
                                            <tr key="propert-value-table">
                                                <th scope="col">Property</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key="property-value-1">
                                                <td>Num:</td>
                                                <td>{pokemon.num}</td>
                                            </tr>
                                            <tr key="property-value-2">
                                                <td>Name:</td>
                                                <td>{pokemon.name}</td>
                                            </tr>
                                            <tr key="property-value-3">
                                                <td>Type:</td>
                                                <td>{pokemon.type.toString()}</td>
                                            </tr>
                                            <tr key="property-value-4">
                                                <td>Weaknesses:</td>
                                                <td>{pokemon.weaknesses.toString()}</td>
                                            </tr>
                                            <tr key="property-value-5">
                                                <td>Height</td>
                                                <td>{pokemon.height}</td>
                                            </tr>
                                            <tr key="property-value-6">
                                                <td>Weight</td>
                                                <td>{pokemon.weight}</td>
                                            </tr>
                                            <tr key="property-value-7">
                                                <td>Candy</td>
                                                <td>{pokemon.candy}</td>
                                            </tr>
                                            <tr key="property-value-8">
                                                <td>Candy Count</td>
                                                <td>
                                                    {'candy_count' in pokemon &&
                                                        <span>{pokemon.candy_count}</span>
                                                    }
                                                    {!'candy_count' in pokemon &&
                                                        <span>--N/A--</span>
                                                    }
                                                </td>
                                            </tr>
                                            <tr key="property-value-9">
                                                <td>Egg</td>
                                                <td>{pokemon.egg}</td>
                                            </tr>
                                            <tr key="property-value-10">
                                                <td>Average Spawns</td>
                                                <td>{pokemon.avg_spawns}</td>
                                            </tr>
                                            <tr key="property-value-11">
                                                <td>Spawn Chance</td>
                                                <td>{pokemon.spawn_chance}</td>
                                            </tr>
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
                                                                <td><img className="mx-auto d-block border" src={pokemonImages[id].img} width="40rem" alt="Pokemon"></img></td>
                                                            </tr>)
                                                        })}
                                                    {'prev_evolution' in pokemon &&
                                                        pokemon.prev_evolution.map((value, index, array) => {
                                                            let id = parseInt(value.num);
                                                            console.log(`Id=`, id);
                                                            return (<tr key={`heading-prev-evolution-${index}`}>
                                                                <td>{value.num}</td>
                                                                <td>{value.name}</td>
                                                                <td><img className="mx-auto d-block border" src={pokemonImages[id].img} width="40rem" alt="Pokemon"></img></td>
                                                            </tr>)
                                                        })}
                                                </tbody>
                                            </table>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {location.state === null &&
                <div>
                    <h1>location.state is null redirecting to Home page in 5 seconds</h1>

                </div>
            }
        </div>
    )
}
export { DetailsView };