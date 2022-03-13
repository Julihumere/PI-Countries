import React from "react";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../Redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setName("");
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleInput(e)}
        value={name}
        placeholder="Search"
        className="input_search"
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="btn_search"
      >
        Buscar
      </button>
    </div>
  );
}
