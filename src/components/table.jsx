import { useEffect } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {

    console.log(`---Begin Function Table()---`);
    console.log(`Props=`, props);

    useEffect(() => {

    })

    const processSort = (event) => {
        console.log(`Begin Function processSort()---`);
        console.log(`Event.id=`,event.target.id);
        switch(event.target.id) {
            case "numeric-sort-down":
                break;
            case "numeric-sort-up":
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
                            <i id="numeric-sort-down" class="bi bi-sort-numeric-down"></i>
                        </button>
                        <button value="numericSortUp" onClick={processSort}>
                            <i id="numeric-sort-up" class="bi bi-sort-numeric-up-alt"></i>
                        </button>
                    </div>
                </td>
                <td>
                    <button>
                        <i className="bi bi-sort-alpha-down"></i>
                    </button>
                    <button>
                        <i className="bi bi-sort-alpha-up-alt"></i>
                    </button>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {props.pokemons.map((value, index, array) => {
                return (<tr key={`results-details-${index}`} id={value.id}>
                    <td key={index}>{value.num}</td>
                    <td key={index}>{value.name}</td>
                    <td key={index}>{value.type.toString()}</td>
                    <td key={index}>{value.weaknesses.toString()}</td>
                    <td key={index}>
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