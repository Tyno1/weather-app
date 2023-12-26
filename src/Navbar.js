import { useEffect, useState } from "react";
import { useMyContext } from "./contexts/Provider";

const Navbar = ({ onSubmit }) => {
  const [newLocations, setNewLocations] = useState([]);
  const [weatherDataUserSpecified, setWeatherDataUserSpecified] = useState({});
  const [prevText, setPrevText] = useState("");

  const { text, setText } = useMyContext() || {};

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text != prevText) {
      //fetching data from weatherApi using name typed in the input tag as "q"`
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${text}&days=10&aqi=yes&alerts=yes`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setWeatherDataUserSpecified(data);
            onSubmit();
          }
        })
        .catch((err) => console.log(err));
    }
    setPrevText(text);
  };

  useEffect(() => {
    // Check if weatherDataUserSpecified is not an empty object
    if (Object.keys(weatherDataUserSpecified).length > 0) {
      // Update the locations and local storage
      setNewLocations((prevLocations) => [
        ...prevLocations,
        weatherDataUserSpecified,
      ]);

      const updatedLocations = [...newLocations, weatherDataUserSpecified];
      console.log(updatedLocations);

      // Store updatedLocations in local storage
      localStorage.setItem("newLocations", JSON.stringify(updatedLocations));
      console.log(localStorage);
    }
  }, [weatherDataUserSpecified]);

  return (
    <div className="color-fade">
      <nav className="navbar">
        <div className="app-name">THE WEDA APP</div>
        <form onSubmit={handleSubmit}>
          <input
            name="search"
            onChange={handleChange}
            value={text}
            type="text"
            placeholder="Input location here"
          />
          <button type="submit">search</button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
