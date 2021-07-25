import { useEffect, useState } from "react";

const WeatherInfo = ({ cityName }) => {
  // Base url to connect to the open weather map website and its api
  // cityName is a variable and is passed as a prop from parent component i.e., App.js
  // Note: paste the API key from open weather map website after login
  const API_KEY = "";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  // Weather info from the api
  const [weather, setWeather] = useState(null);
  // error after hitting the api either city not found or API not there
  const [error, setError] = useState(null);
  // Loding state while the api is hit
  const [pending, setPending] = useState(true);

  // used to run when the cityName changes
  useEffect(() => {
    // fetch API from javascript which returns a promise
    fetch(url)
      // returns a respone with meta data and actual data
      .then((res) => {
        // if the Http status of the response is not in the range of 201 to 299 then something went wrong
        if (!res.ok) {
          throw Error("City not found");
        }
        // returning the json data from response
        return res.json();
      })
      // reciving data
      .then((data) => {
        console.log(data);
        // stopping the loading screen
        setPending(false);
        // setting the error to null as data is recieved
        setError(null);
        // setting the data recived from api
        setWeather(data);
      })
      .catch((error) => {
        // setting the data to null as error has occured
        setWeather(null);
        // stopping the loading screen
        setPending(false);
        // setting the error recieved
        setError(error);
      });
  }, [cityName]);

  // the temparatures recieved from api are Kelvin, the below function converts the kelvin temparature to celsius
  const kelvinToCelsius = (temp) => {
    return Math.floor(temp - 273.15);
  };

  return (
    <div>
      {/* conditionally rendering the loading screen */}
      {pending && <p>Loading...</p>}
      {/* conditionally rendering the error */}
      {error && <p>{error.message}</p>}
      {/* conditionally rendering the weather info */}
      {weather && (
        <div>
          {/* check the log of weather for the whole data and change the below code accordingly */}
          <h1>
            Showing weather info for {weather.name}, {weather.sys.country}
          </h1>
          <h2>Weather summary: {weather.weather[0].description}</h2>
          <p>Temparature: {kelvinToCelsius(weather.main.temp)}&#8451;</p>
          <p>
            Maximum Temparature: {kelvinToCelsius(weather.main.temp_max)}&#8451;
          </p>
          <p>
            Minimum Temparature: {kelvinToCelsius(weather.main.temp_min)}&#8451;
          </p>
          <p>Feels like: {kelvinToCelsius(weather.main.feels_like)}&#8451;</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
