import { React } from "react";
import { useLocation } from "react-router-dom";

const DetailsView = (props) => {

    console.log(`---Begin Function DetailsView()---`);
    const location = useLocation();

    console.log(`Location.state`,location.state);

    let pokemon = null;
    pokemon = location.state.pokemon; 
    
    console.log(`Pokemon`,pokemon);

    return(<div className="container-fluid">
                <div className="row">
                    <div className="col-4 my-center">
                        <h1 className="color-white">Pokemon Details</h1>
                    </div>
                </div>
                {pokemon != null &&
                <div className="row">
                    <div className="col-sm border my-center">
                        <div className="row">
                            <div className="col-4 border">
                                <img src={pokemon.img} width="90%" alt="Pokemon"></img>
                                <p>Num: {pokemon.num}<br></br>
                                    Name: {pokemon.name}<br></br>
                                    Type: {pokemon.type.toString()}<br></br>
                                    Weaknesses: {pokemon.weaknesses.toString()}<br></br>
                                </p>
                            </div>
                            <div className="col border">
                                <p> Height: {pokemon.height}<br></br>
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
                                                    <tr>
                                                        <th scope="col">Num</th>
                                                        <th scope="col">Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    {pokemon.next_evolution.map((value, index, array) => {
                                                        return (<tr scope="row">
                                                                    <td>{value.num}</td>
                                                                    <td>{value.name}</td>
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