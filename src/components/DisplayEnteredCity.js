import React from "react";
import classes from "./DisplayEnteredCity.module.css";
const DisplayEnteredCity = (props) => {
  return (
    <div className={classes.enteredCity}>
      {props.isShow&&props.cities.map((city) => (
        <div key={city.id} className={classes.city}>
          {city.name}
          <button
            className={classes.removeCityBtn}
            onClick={() => props.removeCityHandler(city.id)}
          >
            &#10006;
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayEnteredCity;
