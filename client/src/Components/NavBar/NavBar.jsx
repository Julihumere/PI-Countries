import React, { useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getCountries } from "../../Redux/Actions";

export default function NavBar({ setPage }) {
  const dispatch = useDispatch();

  const handleRefresh = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  };
  return (
    <>
      <nav>
        <div className="container_nav">
          <h1>Countries🌎</h1>
          <SearchBar />
          <Link to={"/activity"}>
            <button className="btn_create">Create Activity</button>
          </Link>
          <button onClick={(e) => handleRefresh(e)} className="btn_refresh">
            🔁
          </button>
        </div>
        <div>
          <Filters setPage={setPage} />
        </div>
      </nav>
    </>
  );
}
