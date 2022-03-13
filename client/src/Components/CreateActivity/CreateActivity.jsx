import React, { useEffect, useState } from "react";
import "./CreateActivity.css";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../img/fondo-create.png";
import { Link } from "react-router-dom";
import { createActivity, getCountries } from "../../Redux/Actions";

export default function CreateActivity() {
  const allcountries = useSelector((state) => state.allCountries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [input, setInput] = useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    if (!input.countries.includes(e.target.value)) {
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
    }
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== e),
    });
  };

  const validate = (input) => {
    let errors = {};
    console.log(errors);
    if (!input.name) {
      errors.name = "Activity is required";
    } else if (!/^[A-Za-z0-9\s]+$/g.test(input.name)) {
      errors.name = "Name only accepts letters and spaces";
    }
    if (!input.duration) {
      errors.duration = "Duration is required";
    } else if (!/^([1-9]|[1-9]\\d|10)$/.test(input.duration)) {
      errors.duration = "The duration must be between 1 and 10";
    }
    if (!input.difficulty) {
      errors.difficulty = "Difficulty is required";
    } else if (!/^([1-4]|[1-4]\\d|5)$/.test(input.difficulty)) {
      errors.difficulty = "The difficulty must be between 1 and 5";
    }
    if (input.countries < 1) {
      errors.countries = "Countries is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(input));
    const err = validate(input);
    if (Object.values(err).length !== 0) {
      alert("Please, correct the errors so that your activity is created");
    } else {
      dispatch(createActivity(input));
      alert("Your activity was created");
      setInput({
        name: "",
        duration: "",
        difficulty: "",
        season: "",
        countries: [],
      });
    }
  };

  return (
    <div>
      <div>
        <Link to={"/home"}>
          <button className="btn_home">Go Home</button>
        </Link>
      </div>
      <div className="container_create">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="container_input">
            <label>Activities</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              className="input_string"
            />
            {error.name && <p>{error.name}</p>}
            <label>Duration</label>
            <input
              type="number"
              name="duration"
              value={input.duration}
              onChange={handleChange}
              className="input_number"
            />
            {error.duration && <p>{error.duration}</p>}
            <label>Difficulty</label>
            <input
              type="number"
              name="difficulty"
              value={input.difficulty}
              onChange={handleChange}
              className="input_number"
            />
            {error.difficulty && <p>{error.difficulty}</p>}
            <label>Season</label>
            <input
              type="text"
              name="season"
              value={input.season}
              onChange={handleChange}
              className="input_string"
            />
            {error.season && <p>{error.season}</p>}
            <label>Countries</label>
            <select onChange={(e) => handleSelect(e)} className="input_select">
              <option value={input.countries} hidden>
                All Countries
              </option>
              {allcountries.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            {error.countries && <p>{error.countries}</p>}
          </div>
          <div className="container_btn">
            <input type="submit" value="Crear" className="btn_submit"></input>
          </div>
        </form>
        <div className="list-country">
          <label>Countries: </label>
          {input.countries.map((e) => (
            <div>
              <h1 className="title-country">
                {e}
                <button onClick={() => handleDelete(e)} className="btn-country">
                  ❌
                </button>
              </h1>
            </div>
          ))}
        </div>

        <div className="wallpaper">
          <img className="stretch" src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
