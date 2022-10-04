import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  Table  from "../components/table.jsx";
import Footer from "../components/footer.jsx";
import { useEffect } from "react";

const Results = (props) => {

    console.log(`---Begin Function Results()---`);

    const location = useLocation();
    const navigate = useNavigate();
    console.log(`Location.state=`,location)

    useEffect(() => {
        console.log(`---Begin Function useEffect()---`);
        if(location.state === null) {
            navigate("/");
        }
        console.log(`---End Function useEffect()---`)
    },[]);
    
    console.log(`---End Function Results()---`);

    return(
        <div className="container">
            <div className="row">
                <div className="col-4 my-center">
                    <h1 className="color-white text-center">Pokemon List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 my-center">
                    { location.state != null && 
                        <Table pokemons={location.state.pokemons} pokemonImages={location.state.pokemonImages}></Table>
                    }
                    { location.state != null &&
                        <div>
                            <p className="error"><span className="color-red">{location.state.errorText}</span></p>
                            <p className="error"><span className="color-red">{location.state.errorNames}</span></p>
                            <p className="error"><span className="color-red">{location.state.errorTypes}</span></p>
                            <p className="error"><span className="color-red">{location.state.errorWeaknesses}</span></p>
                        </div>
                    }
                </div>
            </div>
        
            <div className="row">
                <div className="col-5 my-center">
                    <Footer></Footer>
                </div>
            </div>      
        </div>);
}
export {Results};