import { Link } from "react-router-dom";

const Table = (props) => {
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
                let weaknesses;
                if(typeof value.weaknesses === "undefined") {
                    weaknesses="";
                }
                else
                    weaknesses=value.weaknesses.toString();
                
                let types;
                if(typeof value.type === "undefined") {
                    types="";
                }
                else
                    types=value.type.toString();
                
                return (<tr id={value.id}>
                            <td scope="row">{value.num}</td>
                            <td>{value.name}</td>
                            <td>{types}</td>
                            <td>{weaknesses}</td>
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
    </table>)
}
export default Table;