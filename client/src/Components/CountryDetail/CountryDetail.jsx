import React, { useEffect } from "react";
import "./CountryDetail.css";
import fondo from "../../img/fondo-detail.jpg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail } from "../../Redux/Actions";

export default function CountryDetail() {
  const dispatch = useDispatch();

  const country = useSelector((state) => state.countryDetail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesDetail(id));
  }, [id]);

  return (
    <div className="container_page">
      <div className="container_detail">
        <div className="detail">
          <h1>{country.name}</h1>
          <img src={country.img} alt="" />
          <h2>Abbreviation: {country.id}</h2>
          <h2>Continent: {country.continent}</h2>
          <h2>Capital: {country.capital}</h2>
          <h2>Sub Region: {country.subregion}</h2>
          <h2>Área: {country.area} Km2</h2>
          <h2>Population: {country.population}</h2>

          <Link to={"/home"}>
            <button className="btn_detail">Go Home</button>
          </Link>
        </div>
      </div>
      <div className="container_activity">
        <div className="activity">
          <h1 className="titleUnderline">🅰ctivities</h1>
          <div className="list">
            {country.activities?.map((e) => {
              let season;
              if (e.season === "Winter") season = <span>❄️</span>;
              if (e.season === "Summer") season = <span>☀️</span>;
              if (e.season === "Spring") season = <span>🌷</span>;
              if (e.season === "Autumn") season = <span>🍁</span>;
              return (
                <details>
                  <summary>{e.name}</summary>
                  <p key={e.id}>✔️Name: {e.name} </p>
                  <p>⌚Duration: {e.duration} hrs</p>
                  <p>🌟Difficulty: Level {e.difficulty}</p>
                  <p>
                    {season}Season: {e.season}
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
