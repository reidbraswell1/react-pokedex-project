import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Table = (props) => {

    console.log(`---Begin Function Table()---`);

    const [pokemons, setPokemon] = useState(props.pokemons);

    console.log(`Props=`, props);
    console.log(`Props.pokemons =`, props.pokemons)
    console.log(`Pokemons =`,pokemons);
    console.log(`Props.ids =`,props.ids);
    console.log(`Props.types =`,props.types);
    console.log(`Props.weaknesses =`,props.weaknesses);
    console.log(`Pokemons =`,pokemons);

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        console.log(`---End Function useEffect()---`);
    }, [])

    const processSort = (event) => {
        console.log(`Begin Function processSort()---`);
        console.log(`Event.target.id =`, event.target.id);
        switch (event.target.id) {
            case "numeric-sort-down":
                let nbrDown = pokemons.slice(0);
                nbrDown.sort((a, b) => {
                    return b.id < a.id;
                });
                setPokemon(nbrDown);
                break;
            case "numeric-sort-up":
                let nbrUp = pokemons.slice(0);
                nbrUp.sort((a, b) => {
                    return b.num > a.num;
                });
                setPokemon(nbrUp);
                break;
            case "alpha-sort-down":
                let alphaDown = pokemons.slice(0);
                alphaDown.sort((a, b) => {
                    return b.name < a.name;
                });
                setPokemon(alphaDown);
                break;
            case "alpha-sort-up":
                let alphaUp = pokemons.slice(0);
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

    return (<table className="table table-striped table-bordered background-color-white w-auto mx-auto">
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
                            <i id="numeric-sort-down" className="bi bi-sort-numeric-down" ></i>
                        </button>
                        <button value="numericSortUp" onClick={processSort}>
                            <i id="numeric-sort-up" className="bi bi-sort-numeric-up-alt"></i>
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
            {props.pokemons.map((pokemon, idx, array) => {
                console.log("Pokemon in Table=",pokemon)
                return (<tr key={`tr-${idx}-1`} id={`tr-${idx}-1`}>
                    <td key={`td-${idx}-1`}>{pokemon.num}</td>
                    <td key={`td-${idx}-2`}>{pokemon.name}</td>
                    <td key={`td-${idx}-3`}>{pokemon.type.map((type, idx2, array2) => {
                        return props.types.indexOf(type) < 0 ?
                            (idx2 < pokemon.type.length - 1 ? `${type}, ` : `${type}`) :
                            (idx2 < pokemon.type.length - 1 ? <u>{type}, </u> : <u>{type}</u>)
                    }
                    )}
                    </td>
                    <td key={`td-${idx}-4`}>{pokemon.weaknesses.map((weakness, idx3, array) => {
                        return props.weaknesses.indexOf(weakness) < 0 ?
                            (idx3 < pokemon.weaknesses.length - 1 ? `${weakness}, ` : `${weakness}`) :
                            (idx3 < pokemon.weaknesses.length - 1 ? <u>{weakness}, </u> : <u>{weakness}</u>)

                    }
                    )}
                    </td>
                    <td key={`td-${idx}-5`}>
                       {/* <Link className="" to={`/Details/${pokemon.id}`} state={{ "pokemon": pokemon.id, "pokemonImages": props.pokemonImages }}></Link>*/}
                        <Link className="" to={`/Details/${pokemon.id}`}>
                            <img className="border rounded imgLink mx-auto d-block" style={{ marginLeft: ".5rem", padding: "2px" }} src={pokemon.img} alt="Pokemon" width="40rem" loading="lazy"></img>
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