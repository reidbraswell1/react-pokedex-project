import { Link } from "react-router-dom";

const Table = (props) => {
    return(<table className="table background-color-white">
        <caption style={{captionSide:"top"}}>Table of Pokemons</caption>
        <thead>
            <tr>
                <th scope="col">Num</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Weaknesses</th>
                <th scope="col">Image</th>
            </tr>
        </thead>
        <tbody>
        {props.pokemons.map((value, index, array) => {
                let weaknesses;
                if(typeof value.weaknesses === "undefined") {
                console.log("here");
                    weaknesses="";
                }
                else
                    weaknesses=value.weaknesses.toString();
                
                return (<tr>
                            <td scope="row">{value.id}</td>
                            <td><Link className="link" to="">
                                    {value.name}
                                </Link></td>
                            <td>{value.type}</td>
                            <td>{weaknesses}</td>
                            <td>
                                <img className="border border-rounded" style={{marginLeft:".5rem", padding:"2px"}} width="35rem" src={value.img}></img>
                            </td>
                    </tr>  
                    )
                })
            }
        </tbody>
    </table>)
}
export default Table;