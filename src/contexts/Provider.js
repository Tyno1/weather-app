import React, { createContext, useContext, useState, useEffect } from "react";

const MyContext = createContext();

const Provider = ({ children }) => {
  const [coords, setCoords] = useState(null);
  const [weatherDataCurrent, setWeatherDataCurrent] = useState(null);
  const [text, setText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null); //resolve this
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  const showPosition = (position) => {
    setIsLoading(true)
    const currentCoords = `${position.coords.latitude},${position.coords.longitude}`;
    console.log(currentCoords);
    setCoords(currentCoords);

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${currentCoords}&days=10&aqi=yes&alerts=yes`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Confirm that it's a valid location
        setWeatherDataCurrent(data);
        setIsLoading(false)
      });
  };

  const contextValues = {
    weatherDataCurrent,
    setWeatherDataCurrent,
    text,
    setText,
    selectedLocation,
    setSelectedLocation,
    getLocation,
    setCoords,
    coords,
    isLoading
  };

  useEffect(() => {
    getLocation();
  }, []);
  

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};

export default Provider;

export const useMyContext = () => {
  return useContext(MyContext);
};
