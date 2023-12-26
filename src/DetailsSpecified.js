import { useMyContext } from "./contexts/Provider";

const DetailsSpecified = () => {
  const { selectedLocation } = useMyContext();

  return (
    <div className="main-display">
      <div className="section-1">
        <h2>
          {selectedLocation.location.name}, {selectedLocation.location.country}
        </h2>
        <p className="current-temp">{selectedLocation.current.temp_c}º</p>
        <p>{selectedLocation.current.condition.text}</p>
        <p>
          H:
          {Math.round(selectedLocation.forecast.forecastday[0].day.maxtemp_c)}º
          L:
          {Math.round(selectedLocation.forecast.forecastday[0].day.mintemp_c)}º
        </p>
      </div>
      <div className="section-2">
        <div className="current-forecast">
          <p className="forecast-summary">
            {selectedLocation.current.condition.text}
          </p>
          <div className="hourly-forecast">
            <div className="scroller">
              {selectedLocation.forecast.forecastday[0].hour.map((hours) => (
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
                {selectedLocation.forecast.forecastday.map((days) => (
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
              <div className="feels">
                <p style={{ fontSize: "30px" }}>Feels Like</p>
                <div style={{ fontSize: "40px" }}>
                  {Math.round(selectedLocation.current.feelslike_c)}º
                </div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "justify",
                  marginBottom: "10px",
                }}
              >
                The 'feels like' temperature measures the expected air
                temperature, relative humidity and strength of wind at 5 feet
                (human height) as well as an understanding of how heat is lost
                from the human body during cold and windy days.
              </p>
            </div>
            <div className="two">
              <div className="feels">
                <p style={{ fontSize: "30px" }}>Air Quality</p>
                <div style={{ fontSize: "40px" }}>
                  {selectedLocation.current.air_quality["gb-defra-index"]}
                </div>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "justify",
                  marginBottom: "10px",
                }}
              >
                DEFRA Index tells you about levels of air pollution. The index
                is numbered 1-10 and divided into four bands, low (1) to very
                high (10), to provide detail about air pollution levels in a
                simple way, similar to the sun index or pollen index.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSpecified;
