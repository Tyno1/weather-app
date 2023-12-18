import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
//   const [location, setLocation] = useState("");

// const [myLocation, setMyLocation] = useState([
//   {}
// ]);


//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setMyLocation(...MyLocation, setLocation)
//   };
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const currentCoords = `${position.coords.latitude},${position.coords.longitude}`;
    console.log(currentCoords);
    setCoords(currentCoords);

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${currentCoords}&days=10&aqi=yes&alerts=yes`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }

  useEffect(() => {
    getLocation();
  }, [setWeatherData]);

  return (
    <div className="App">
      {weatherData && (
        <div className="container">
          <div className="inner-menu">
            <div className="location-1">
              <div className="location-name">
                <div>
                  <h4>My Location</h4>
                  <p>{weatherData.location.localtime.substr(11, 5)}</p>
                </div>
                <div className="degree">{weatherData.current.temp_c}º</div>
              </div>
              <div className="location-condition">
                <p>{weatherData.current.condition.text}</p>
                <div className="highs-lows">
                  <p>
                    H:
                    {Math.round(
                      weatherData.forecast.forecastday[0].day.maxtemp_c
                    )}
                    º L:
                    {Math.round(
                      weatherData.forecast.forecastday[0].day.mintemp_c
                    )}
                    º
                  </p>
                </div>
              </div>
            </div>
            <div className="location-2"></div>
            <div className="location-3"></div>
            <div className="location-4"></div>
          </div>
          <div className="main-display">
            <Navbar />
            <div className="section-1">
              <h2>
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
              <p className="current-temp">{weatherData.current.temp_c}º</p>
              <p>{weatherData.current.condition.text}</p>
              <p>
                H:
                {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}º
                L:
                {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}º
              </p>
            </div>
            <div className="section-2">
              <div className="current-forecast">
                <p className="forecast-summary">
                  {weatherData.current.condition.text}
                </p>
                <div className="hourly-forecast">
                  <div className="scroller">
                    {weatherData.forecast.forecastday[0].hour.map((hours) => (
                      <div className="hour" key={hours.index}>
                        <p>{hours.time.substr(11, 5)}</p>
                        <div className="icon-container">
                          <img src={hours.condition.icon} alt="" />
                        </div>
                        <p>{Math.round(hours.temp_c)}º</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="section-2b">
                <div className="ten-day-forecast">
                  <p className="forecast-summary">10 DAY FORECAST</p>
                  <div className="daily-forecast">
                    <div className="scroller">
                      {weatherData.forecast.forecastday.map((days) => (
                        <div className="days" key={days.index}>
                          <p>{days.date}</p>
                          <div className="icon-container">
                            <img src={days.day.condition.icon} alt="" />
                          </div>
                          <p>{Math.round(days.day.avgtemp_c)}º</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="others">
                  <div className="one">
                    <p>1</p>
                  </div>
                  <div className="two">
                    <p>2</p> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
