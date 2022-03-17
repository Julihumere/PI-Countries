import React, { useState } from "react";
import "./Home.css";
import fondo from "../../img/fondo-mundo.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../Redux/Actions";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import gif from "../../img/gif-search.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  // Pagination //

  const [page, setPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountry = page * countriesPerPage;
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountry = allCountries?.slice(firstCountry, lastCountry);

  const pagination = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div>
      <div>
        <NavBar setPage={setPage} />
      </div>

      <div>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="container-card">
        {currentCountry?.length > 0 ? (
          currentCountry?.map((e) => (
            <Card
              key={e.id}
              id={e.id}
              name={e.name}
              img={e.img}
              continent={e.continent}
              population={e.population}
            />
          ))
        ) : (
          <div className="container_error">
            <h1>{error}</h1>
            <img src={gif} alt="" />
          </div>
        )}
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
