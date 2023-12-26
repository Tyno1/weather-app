import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useMyContext } from "./contexts/Provider";

const AppFrame = () => {
  const myLocations = JSON.parse(localStorage.getItem("newLocations"));
  const { weatherDataCurrent, setSelectedLocation } = useMyContext();

  return (
    <div className="inner-menu">
      <div className="scroller">
        {weatherDataCurrent && (
          <div style={{ width: "100%" }}>
            <Link to={"/"}>
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
        )}
      </div>
    </div>
  );
};

export default AppFrame;
