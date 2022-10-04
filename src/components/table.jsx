import { Link } from "react-router-dom";

const Table = (props) => {

    console.log(`---Begin Function Table()---`);
    console.log(`Props=`,props);
    console.log(`---End Function Table()---`);

    return(<table className="table background-color-white">
        <caption className="text-center" style={{captionSide:"top"}}>Table of Pokemons {props.pokemons.length} Rows Returned</caption>
        <thead>
            <tr>
                <th scope="col">Num</th>
                <th scope="col">Name</th>
                <th scope="col">Types</th>
                <th scope="col">Weaknesses</th>
                <th scope="col">Image</th>
            </tr>
        </thead>
        <tbody>
        {props.pokemons.map((value, index, array) => {
                return (<tr id={value.id}>
                            <td key={index}>{value.num}</td>
                            <td key={index}>{value.name}</td>
                            <td key={index}>{value.type.toString()}</td>
                            <td key={index}>{value.weaknesses.toString()}</td>
                            <td key={index}>
                                <Link className="" to={`/Details/${value.id}`} state={{"pokemon":value,"pokemonImages":props.pokemonImages}}>
                                <img className="border rounded imgLink" style={{marginLeft:".5rem", padding:"2px"}} src={value.img} alt="Pokemon" width="40rem"></img>
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