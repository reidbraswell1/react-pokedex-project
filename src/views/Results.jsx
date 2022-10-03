import { useLocation } from "react-router-dom";
import  Table  from "../components/table.jsx";
import Footer from "../components/footer.jsx";

const Results = (props) => {

    console.log(`---Begin Function Results()---`);
    console.log(`Props`,props.results);
    const location = useLocation();
    console.log(`Location=`,location)
    console.log(`---End Function Results()---`);

    return(
        <div className="container">
            <div className="row">
                <div className="col-4 my-center">
                    <h1 className="color-white">Pokedex List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 my-center">
                    <Table pokemons={location.state}></Table>
                    <p className="error"><span className="color-red">{props.errorText}</span></p>
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