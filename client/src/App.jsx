import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Display from "./components/Display";
import Footer from "./components/Footer";

const App = () => {
  const [weather, setWeather] = useState(null);
  
  const fetchWeather = async (city) => {
    try {
      const weatherApi = import.meta.env.VITE_WEATHER_API;
      const response = await fetch(`${weatherApi}?city=${city}`);
      const data = await response.json();
      if (data["weather-data"]) {
        setWeather(data["weather-data"]);
        localStorage.setItem("weather", JSON.stringify(data["weather-data"]));
      } else {
        alert("Failed to fetch weather data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred. Please try again.");
    }
  };
  useEffect(() => {
    const storedWeather = localStorage.getItem("weather");
    if (storedWeather) {
      setWeather(JSON.parse(storedWeather));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen selection:bg-blue-600 selection:text-white">
        <Header />
        <div className="h-full bgc flex flex-col items-center p-4">
          <h1 className="md:text-2xl text-xl  font-bold text-white bg-transparent shadow-sm drop-shadow-lg text mt-5 overflow-hidden">Get realtime Weather data of a City</h1>
          <Search onSearch={fetchWeather} />
          <Display weather={weather} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
