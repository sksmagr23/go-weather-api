import { IoMdPin } from "react-icons/io";
import { WiTime8 , WiHumidity } from "react-icons/wi";
import { IoThermometerOutline } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { GiPin } from "react-icons/gi";

const Display = ({ weather }) => {
  if (!weather) {
    return <p className="text-center mt-8 text-md md:text-lg text-blue-950">Enter a city name to see the weather!</p>;
  }
  
  return (
    <div className="relative flex flex-col items-center mt-8 bgcard p-6 rounded-lg transform transition-all duration-300 text-center hover:drop-shadow-2xl backdrop-blur-3xl">
      <GiPin
        className="absolute md:top-[-20px] md:left-[-20px] top-[-15px] left-[-15px] text-blue-900 transform scale-x-[-1] text-3xl md:text-4xl"
        aria-label="Pin Icon"
      />
      <h2 className="text-2xl lg:text-3xl font-semibold mb-2 caps uppercase flex items-center space-x-1">
        <IoMdPin /> {weather.city} <span className="text-xl lg:text-2xl pl-2">({weather.country})</span>
      </h2>
      <img
        src={weather.icon.startsWith("http") ? weather.icon : `https:${weather.icon}`}
        alt={weather.condition}
        className="h-24 lg:h-28"
      />
      
      <p className="text-xl lg:text-2xl text-gray-600">
        {weather.condition}
      </p>
      <p className="text-2xl lg:text-3xl font-bold my-6 border border-blue-300 px-2 rounded-xl flex items-center shadow-black/20 shadow-md">
        <IoThermometerOutline />{weather.temperature}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-3">
        <p className="text-lg lg:text-2xl text-gray-600 space-x-2 flex justify-start border border-blue-300 p-2 rounded-xl shadow-black/20 shadow-md">
          <span className="flex items-center"><WiTime8 /><span className="text-md lg:text-xl">Local :</span></span> <span className="text-gray-800">{weather.localtime}</span>
        </p>
        <p className="text-lg lg:text-2xl text-gray-600 space-x-2 flex justify-start border border-blue-300 p-2 rounded-xl shadow-black/20 shadow-md">
          <span className="flex items-center"><WiHumidity /><span className="text-md lg:text-xl">Humidity :</span></span> <span className="text-gray-800">{weather.humidity}</span>
        </p>
        <p className="text-lg lg:text-2xl text-gray-600 space-x-2 flex justify-start border border-blue-300 p-2 rounded-xl shadow-black/20 shadow-md">
          <span className="flex items-center space-x-1"><FaWind /><span className="text-md lg:text-xl">Wind :</span></span> <span className="text-gray-800">{weather.wind_speed}</span>
        </p>
        <p className="text-lg lg:text-2xl text-gray-600 space-x-2 flex justify-start border border-blue-300 p-2 rounded-xl shadow-black/20 shadow-md">
          <span className="flex items-center"><LiaRulerVerticalSolid /><span className="text-md lg:text-xl">Pressure :</span></span> <span className="text-gray-800">{weather.pressure}</span>
        </p>
      </div>
    </div>
  );
};

export default Display;

{/* <img
        src={weather.icon.startsWith("http") ? weather.icon : `https:${weather.icon}`}
        alt={weather.condition}
        className="w-20 h-20"
      /> */}