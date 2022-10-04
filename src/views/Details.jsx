import { React } from "react";
import { useLocation } from "react-router-dom";

const DetailsView = (props) => {

    console.log(`---Begin Function DetailsView()---`);
    const location = useLocation();

    console.log(`Location.state`,location.state);

    let pokemon = null;
    let pokemonImages = null;
    pokemon = location.state.pokemon; 
    pokemonImages = location.state.pokemonImages; 

    console.log(`Pokemon`,pokemon);
    console.log(`PokemonImages`,pokemonImages);

    return(<div className="container-fluid">
                <div className="row">
                    <div className="col-4 my-center">
                        <h1 className="color-white">Pokemon Details</h1>
                    </div>
                </div>
                {pokemon != null &&
                <div className="row">
                    <div className="col-sm my-center">
                        <div class="row">
                        <div class="col-4 my-center">
                                <img className="border" src={pokemon.img} width="50%" alt="Pokemon"></img>
                                <p className="color-white">Num: {pokemon.num}<br></br>
                                    Name: {pokemon.name}<br></br>
                                    Type: {pokemon.type.toString()}<br></br>
                                    Weaknesses: {pokemon.weaknesses.toString()}<br></br>
                                </p>
                                <p className="color-white"> Height: {pokemon.height}<br></br>
                                    Weight: {pokemon.weight}<br></br>
                                    Candy: {pokemon.candy}<br></br>
                                    Candy Count: {pokemon.candy_count}<br></br>
                                    Egg: {pokemon.egg}<br></br>
                                    Average Spawns: {pokemon.avg_spawns}<br></br>
                                    Next Evolution:<br></br>
                                    <div className="row">
                                        <div className="col-4">
                                            <table className="table table-sm table-striped table-bordered background-color-white">
                                                <thead>
                                                    <tr key="heading-next-evolution">
                                                        <th scope="col">Num</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    {pokemon.next_evolution.map((value, index, array) => {
                                                        let id = parseInt(value.num);
                                                        return (<tr key={`heading-next-evolution-${index}`}>
                                                                    <td>{value.num}</td>
                                                                    <td>{value.name}</td>
                                                                    <td><img src={pokemonImages[id].img} width="50rem" alt="Pokemon"></img></td>
                                                            </tr>)
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            </div>
                            </div>
                        </div>
                }
            </div>)
}
export { DetailsView };