import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {

    console.log(`---Begin Function Table()---`);
    console.log(`Props=`, props);

    const [pokemon, setPokemon] = useState(props.pokemons);

    useEffect(() => {

    },[])

    const processSort = (event) => {
        console.log(`Begin Function processSort()---`);
        console.log(`Event.target.id =`,event.target.id);
        switch(event.target.id) {
            case "numeric-sort-down":
                let nbrDown = props.pokemons.slice(0);
                nbrDown.sort((a, b) => {
                    return b.id < a.id;
                });
                setPokemon(nbrDown);
                break;
            case "numeric-sort-up":
                let nbrUp = props.pokemons.slice(0);
                nbrUp.sort((a, b) => {
                    return b.num > a.num;
                });
                setPokemon(nbrUp);
                break;
            case "alpha-sort-down":
                let alphaDown = props.pokemons.slice(0);
                alphaDown.sort((a, b) => {
                    return b.name < a.name;
                });
                setPokemon(alphaDown);
                break;
            case "alpha-sort-up":
                let alphaUp = props.pokemons.slice(0);
                alphaUp.sort((a, b) => {
                    return b.name > a.name;
                });
                setPokemon(alphaUp);
                break;
            default:
                break;
        }
        console.log(`End Function processSort()---`);
    }

    console.log(`---End Function Table()---`);

    return (<table className="table table-striped table-bordered background-color-white w-auto">
        <caption className="text-center" style={{ captionSide: "top" }}>Table of Pokemons {props.pokemons.length} Rows Returned</caption>
        <thead>
            <tr key="results-heading">
                <th scope="col">Num</th>
                <th scope="col">Name</th>
                <th scope="col">Types</th>
                <th scope="col">Weaknesses</th>
                <th scope="col">Image</th>
            </tr>
            <tr>
                <td>
                    <div className="w-12">
                        <button value="numericSortDown" onClick={processSort}>
                            <i id="numeric-sort-down" class="bi bi-sort-numeric-down" ></i>
                        </button>
                        <button value="numericSortUp" onClick={processSort}>
                            <i id="numeric-sort-up" class="bi bi-sort-numeric-up-alt"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <button onClick={processSort}>
                        <i id="alpha-sort-down" className="bi bi-sort-alpha-down"></i>
                    </button>
                    <button onClick={processSort}>
                        <i id="alpha-sort-up" className="bi bi-sort-alpha-up-alt"></i>
                    </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {pokemon.map((value, index, array) => {
                return (<tr key={`results-details-tr-${index}`} id={`results-details-tr-${index}`}>
                    <td key={`results-details-td-1`}>{value.num}</td>
                    <td key={`results-details-td-2`}>{value.name}</td>
                    <td key={`results-details-td-3`}>{value.type.toString()}</td>
                    <td key={`results-details-td-4`}>{value.weaknesses.toString()}</td>
                    <td key={`results-details-td-5`}>
                        <Link className="" to={`/Details/${value.id}`} state={{ "pokemon": value, "pokemonImages": props.pokemonImages }}>
                            <img className="border rounded imgLink mx-auto d-block" style={{ marginLeft: ".5rem", padding: "2px" }} src={value.img} alt="Pokemon" width="40rem" loading="lazy"></img>
                        </Link>
                    </td>
                </tr>
                )
            })
            }
        </tbody>
    </table>);
}
export default Table;