import React from "react";
import classes from "./DisplayCityTemp.module.css";

const DisplayCityTemp = (props) => {
  return (
    <div className={classes.citiesTemperatures}>
      {props.cities.map((city) => (
        <div key={city.id} className={classes.temperature}>
          <div className={classes.cityName}>{city.name}</div>
          <div className={classes.temperatureValue}>
            {props.weather[city.name]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCityTemp;
