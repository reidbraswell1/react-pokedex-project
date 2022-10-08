import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "../components/table.jsx";
import Footer from "../components/footer.jsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type/index.js";

const Results = (props) => {

    console.log(`---Begin Function Results()---`);

    const params = useParams();
    console.log(`Props.pokedexList =`,props.pokedexList);
    console.log(`Params.ids =`,params.ids);
    console.log(`Params.types =`,params.types);
    console.log(`Params.weaknesses =`,params.weaknesses);

    let ids = params.ids.split(",");
    let types = params.types.split(",");
    let weaknesses = params.weaknesses.split(",");
    console.log(`Ids =`,ids);
    console.log(`Types =`,types);
    console.log(`Weaknesses =`,weaknesses);

    const location = useLocation();
    const navigate = useNavigate();
    console.log(`Location.state=`, location)

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        if (location.state === null) {
            navigate("/");
        }
        console.log(`---End Function useEffect()---`)
    }, []);

    console.log(`---End Function Results()---`);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4 mx-auto">
                    <h1 className="color-white text-center">Pokemon List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-7 mx-auto">
                    {location.state != null &&
                        <Table pokemons={props.pokedexList.pokemon} pokemonImages={location.state.pokemonImages} ids={params.ids} weaknesses={params.weaknesses} types={params.types}></Table>
                    }
                    <div className="row">
                        <div className="col-7 mx-auto">
                            {location.state != null && location.state.errorText.length > 0 &&
                                <div>
                                    <p className="error"><span className="color-red">{location.state.errorText}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterNames}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterTypes}</span></p>
                                    <p className="error"><span className="color-red">{location.state.filterWeaknesses}</span></p>
                                </div>
                            }
                            {location.state != null && location.state.filterText.length > 0 &&
                                <div>
                                    <p className="error"><span className="color-white">{location.state.filterText}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterNames}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterTypes}</span></p>
                                    <p className="error"><span className="color-white">{location.state.filterWeaknesses}</span></p>
                                </div>
                            }
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>);
}
export { Results };