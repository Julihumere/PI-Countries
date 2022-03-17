import React from "react";
import "./Filters.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByActivity,
  filterByContinent,
  filterByLetter,
  filterByPopulation,
  filterBySubRegion,
} from "../../Redux/Actions";

export default function Filters({ setPage }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const countries = useSelector((state) => state.allCountries);

  const handleFilterByLetter = (e) => {
    e.preventDefault();
    dispatch(filterByLetter(e.target.value));
    setOrder(`${e.target.value}`);
    setPage(1);
  };

  const handleFilterByPopulation = (e) => {
    e.preventDefault();
    dispatch(filterByPopulation(e.target.value));
    setOrder(`${e.target.value}`);
    setPage(1);
  };

  let continents = countries.map((e) => e.continent);
  let filterContinents = continents.filter((e, index) => {
    return continents.indexOf(e) === index;
  });

  const handleFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setOrder(`${e.target.value}`);
    setPage(1);
  };

  let array = [];
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].activities.length > 0) {
      array.push(countries[i].activities);
    }
  }

  let filterActivity = [];
  array.map((e) => {
    e.map((e) => {
      if (!filterActivity.includes(e.name)) {
        filterActivity.push(e.name);
      }
    });
  });

  const handleFilterByActivities = (e) => {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value));
    setOrder(`${e.target.value}`);
    setPage(1);
  };

  return (
    <div className="container_filter">
      <div>
        <select onChange={(e) => handleFilterByLetter(e)}>
          <option hidden>Order By Letter</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterByPopulation(e)}>
          <option hidden>Order By Population</option>
          <option value="asc">Higher Population</option>
          <option value="desc">Lower Population</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterByContinent(e)}>
          <option hidden>Order By Continents</option>
          <option value="All">All Continents</option>
          {filterContinents.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={(e) => handleFilterByActivities(e)}>
          <option hidden>Order By Activities</option>
          <option value="All">All</option>
          {filterActivity.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
