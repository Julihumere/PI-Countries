import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ id, name, continent, img, population }) {
  return (
    <div className="body__page">
      <div className="container__card">
        <div className="card c1">
          <div className="icon">
            <img src={img} alt="" />
          </div>
          <div className="info__description">
            <h1>{name}</h1>
            <h2>Continent: {continent}</h2>
            <h2>Population: {population}</h2>
            <Link to={`/countries/${id}`}>
              <button className="btn-detail">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
