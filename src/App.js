import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DetailsCurrent from "./DetailsCurrent";
import { Route, Routes, Link } from "react-router-dom";
import DetailsSpecified from "./DetailsSpecified";

function App() {
  const [coords, setCoords] = useState(null);
  const [weatherDataCurrent, setWeatherDataCurrent] = useState(null);
  const [text, setText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const myLocations = JSON.parse(localStorage.getItem("newLocations"));

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
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
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
                  <Navbar setText={setText} text={text} onSubmit={getLocation} />

      {weatherDataCurrent && (
        <div className="container">
          <div className="inner-menu">
            <Link to={"/current"}>
              <div className="location-1">
                <div className="location-name">
                  <div>
                    <h4>My Location</h4>
                    <p>{weatherDataCurrent.location.localtime.substr(11, 5)}</p>
                  </div>
                  <div className="degree">
                    {weatherDataCurrent.current.temp_c}º
                  </div>
                </div>
                <div className="location-condition">
                  <p>{weatherDataCurrent.current.condition.text}</p>
                  <div className="highs-lows">
                    <p>
                      H:
                      {Math.round(
                        weatherDataCurrent.forecast.forecastday[0].day.maxtemp_c
                      )}
                      º L:
                      {Math.round(
                        weatherDataCurrent.forecast.forecastday[0].day.mintemp_c
                      )}
                      º
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link>
              <div className="other-locations">
                {console.log(myLocations)}

                {myLocations &&
                  myLocations?.length > 0 &&
                  myLocations.map((locations, i) => (
                    <Link key={i} to={`/specified`}>
                      <div
                        className="location-1"
                        onClick={() => setSelectedLocation(locations)}
                      >
                        <div className="location-name">
                          <div>
                            <h4>{locations.location.name}</h4>
                            <p>{locations.location.localtime.substr(11, 5)}</p>
                          </div>
                          <div className="degree">
                            {locations.current.temp_c}º
                          </div>
                        </div>
                        <div className="location-condition">
                          <p>{locations.current.condition.text}</p>
                          <div className="highs-lows">
                            <p>
                              H:
                              {Math.round(
                                locations.forecast.forecastday[0].day.maxtemp_c
                              )}
                              º L:
                              {Math.round(
                                locations.forecast.forecastday[0].day.mintemp_c
                              )}
                              º
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </Link>
          </div>
          <Routes>
            <Route
              path="/current"
              element={
                <DetailsCurrent
                  setText={setText}
                  text={text}
                  getLocation={getLocation}
                  weatherDataCurrent={weatherDataCurrent}
                />
              }
            />
            <Route
              path="/specified"
              element={
                <DetailsSpecified
                  selectedLocation={selectedLocation}
                  setText={setText}
                  text={text}
                  getLocation={getLocation}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
