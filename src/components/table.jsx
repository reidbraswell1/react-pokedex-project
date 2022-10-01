import { Link } from "react-router-dom";

const Table = (props) => {

    console.log(`---Begin Function Table()---`);
    console.log(`Props=`,props);
    console.log(`---End Function Table()---`);

    return(<table className="table background-color-white">
        <caption style={{captionSide:"top"}}>Table of Pokemons</caption>
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
                            <td>{value.num}</td>
                            <td>{value.name}</td>
                            <td>{value.type.toString()}</td>
                            <td>{value.weaknesses.toString()}</td>
                            <td>
                                <Link className="" to={`/Details/${value.id}`}>
                                <img className="border rounded imgLink" style={{marginLeft:".5rem", padding:"2px"}} src={value.img} width="40rem"></img>
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