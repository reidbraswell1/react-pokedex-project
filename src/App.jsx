import { React, useEffect, useState } from "react";
import { BrowserRouter, NavLink, Redirect, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage.jsx";
import { ResultsPage } from "./pages/ResultsPage.jsx";
import { DetailsPage } from "./pages/DetailsPage.jsx";

const App = (props) => {

  console.log(`---Begin Function ${App.name}()---`);

  const [ types, setTypes ] = useState([]);
  const [ weaknesses, setWeaknesses ] = useState([]);
  const [ names, setNames ] = useState([{"id":0,"name":""}]);
  const [ images, setImages ] = useState([{"id":0,"img":""}]);
  const [ errorText, setErrorText ] = useState("");
  const [ errorTest, setErrorTest ] = useState(false);

  const homePageHeading = "Pokemon Search";
  const resultsPageHeading = "Pokemon Search Results";
  const detailsPageHeading = "Pokemon Details";
  
  useEffect(() => {
    console.log(`---Begin ${useEffect.name}()---`);
    console.log(`---End ${useEffect.name}()---`)
  },[]);

  console.log(`---End Function ${App.name}()---`);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-light">
        <ul id="nav-items" className="navbar-nav">
          <li id="nav-item-home" className="nav-item">
            <NavLink className={({isActive}) => (isActive ? "nav-link color-white active" : "nav-link color-white not-active")} to="/" end>Home</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
          <Route exact path="/" element={<HomePage pageTitle={homePageHeading}> </HomePage>}end></Route>
          <Route path="/Results/:ids/:names/:types/:weaknesses/" element={<ResultsPage pageTitle={resultsPageHeading}></ResultsPage>}></Route>
          <Route path="/Details/:id" element={<DetailsPage pageTitle="Details"></DetailsPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
