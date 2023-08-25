import React, { useState } from "react";
import classes from "./Home.module.css";
import { v4 as uuid } from "uuid";
import DisplayEnteredCity from "./DisplayEnteredCity";
import DisplayCityTemp from "./DisplayCityTemp";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error handling
  const [displayCity,setDisplayCity] = useState([]);


  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const addCityHandler = () => {
    if (inputValue === "") {
      return;
    }
    const id = uuid();
    setCities([...cities, { id: id, name: inputValue }]);
    setInputValue("");
    setIsShow(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addCityHandler();
    }
  };

  const removeCityHandler = (cityId) => {
    const updatedCities = cities.filter((c) => c.id !== cityId);
    setCities(updatedCities);
  };

  const fetchWeather = () => {
    const requestbody = {
      cities: cities.map((city) => city.name),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestbody),
    };

    // Reset error state before making the fetch request
    setError(null);

    fetch("https://weather-info-x1z2.onrender.com/getWeather", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setIsShow(true);
        setIsLoading(false);
        setCities([]);
      })
      .catch((error) => {
        setError(error); // Set the error state in case of fetch errors
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  const showTemperatureHandler = async () => {
    setIsLoading(true);
    setIsShow(false);
    setError(null);
    setWeather([]);
    setDisplayCity(cities);
    await fetchWeather();
    
  };

  return (
    <div>
      <DisplayEnteredCity
        cities={cities}
        removeCityHandler={removeCityHandler}
        isShow={!isShow}
      />
      <input
        type="text"
        value={inputValue}
        onChange={inputChangeHandler}
        className={classes.input}
        placeholder="Press Enter to Add City"
        onKeyDown={handleKeyPress}
      />
      <button className={classes.addCitybtn} onClick={addCityHandler}>
        Add City
      </button>

      <button className={classes.showTempbtn} onClick={showTemperatureHandler}>
        Show Temperature
      </button>
      {isLoading && <LoadingSpinner />}
      {error && !isLoading && <p className={classes.errorMsg}>An error occurred: {error.message}</p>}
      {isShow  && !isLoading  && !error && <DisplayCityTemp weather={weather} cities={displayCity} />}
    </div>
  );
};

export default Home;
