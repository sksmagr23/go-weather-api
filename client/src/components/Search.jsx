import React, { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    onSearch(city);
  };

  return (
    <div className="flex items-center bg-gray-200 shadow-md w-80 overflow-hidden mt-2">
      <span className="flex items-center justify-center px-4">
        <TiWeatherPartlySunny className="text-gray-500 text-lg" />
      </span>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 input p-3 text-blue-800 font-semibold"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-700 text-white px-4 py-4 hover:bg-blue-950 active:bg-blue-800 transition-all transform duration-200"
      >
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

export default Search;
