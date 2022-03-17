import { Route, Routes } from "react-router-dom";
import "./AppRouter.css";
import Landing from "../Components/Landing/Landing";
import Home from "../Components/Home/Home";
import CountryDetail from "../Components/CountryDetail/CountryDetail";
import CreateActivity from "../Components/CreateActivity/CreateActivity";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="home" element={<Home />} />
        <Route exact path="/countries/:id" element={<CountryDetail />} />
        <Route exact path="/activity" element={<CreateActivity />} />
      </Routes>
    </>
  );
}

export default App;
