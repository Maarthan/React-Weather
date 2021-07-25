import "./App.css";
import { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  // used to connect to the input field where user enters the city name
  const [cityName, setCityName] = useState("");
  // Used to pass the cityName after the button is clicked
  // this extra state is to prevent the api hit of weather when user is typing
  const [city, setCity] = useState("");
  // state to render the weather prop based on a boolean value
  const [showWeather, setShowWeather] = useState(false);

  // on click of the get weather info button
  const onSubmit = () => {
    // checking to see if city name is empty
    if (cityName !== "") {
      console.log(cityName);
      // setting the showWeather to true so that the component is rendered
      setShowWeather(true);
      // setting the city variable so it will be passed to WeatherInfo component
      setCity(cityName.trim());
    }
  };

  return (
    <div className="App">
      {/* Div to hold input and button */}
      <div>
        {/* Input field to get the user input for a city name */}
        {/* value is set to cityName state */}
        {/* when something changes i.e., kep press the event will be triggered and the state will be set / changed */}
        <input
          type="text"
          placeholder="Enter a city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        {/* button to submit the value to the component as mentioned in the onSubmit funtion */}
        <button type="button" onClick={onSubmit}>
          Get Weather Info
        </button>
      </div>
      {/* Conditionally rendering the WeatherInfo component based on the state's value */}
      {/* Sending down the cityName as prop to WeatherInfo component */}
      {showWeather && <WeatherInfo cityName={city} />}
    </div>
  );
}

export default App;
