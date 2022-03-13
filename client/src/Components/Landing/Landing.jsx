import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import fondo from "../../img/fondo-landing.jpg";

export default function Landing() {
  return (
    <div className="container-landing">
      <div className="text">
        <h1>Welcome to The Countries</h1>
        <p>
          Hello, Welcome to The Countries, here you can find all the activities
          of the different countries and you can also add them to your
          respective countries
        </p>
      </div>
      <div>
        <Link to={"/home"}>
          <button className="btn">Enter</button>
        </Link>
      </div>
      <div className="wallpaper">
        <img className="stretch" src={fondo} alt="" />
      </div>
    </div>
  );
}
