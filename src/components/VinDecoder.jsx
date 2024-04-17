import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetch from "node-fetch";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import TypeWriter from "./TypeWriter";
import SearchBar from "./SearchBar";

function VinDecoder() {
  const { text } = useTypewriter({
    words: [
      "Welcome to Prestige Parts",
      "To Get Started",
      "Enter Your VIN Number in the Field Below",
    ],
    loop: true,
    delaySpeed: 200,
  });

  const [vin, setVin] = useState("");
  const [error, setError] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [series, setSeries] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [trim, setTrim] = useState("");
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Ensure query is a string
    const queryString = query.toString();
  
    console.log("Searching for:", queryString);
    const filteredParts = parts.filter((part) =>
      part.description.toLowerCase().includes(queryString.toLowerCase())
    );
    setFilteredParts(filteredParts);
    navigate("/parts");
  };

  async function handleVinDecode() {
    try {
      console.log("Sending request to API with VIN:", vin);
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to decode VIN");
      }

      const data = await response.json();
      const results = data.Results;

      if (!results || results.length === 0) {
        throw new Error("No results found for the VIN");
      }

      const info = {
        year:
          results.find((result) => result.Variable === "Model Year")?.Value ||
          "",
        make: results.find((result) => result.Variable === "Make")?.Value || "",
        model:
          results.find((result) => result.Variable === "Model")?.Value || "",
        engine:
          results.find((result) => result.Variable === "Displacement (L)")
            ?.Value || "",
        transmission:
          results.find((result) => result.Variable === "Transmission Style")
            ?.Value || "",
        trim: results.find((result) => result.Variable === "Trim")?.Value || "",
        series:
          results.find((result) => result.Variable === "Series")?.Value || "",
      };

      setYear(info.year);
      setMake(info.make);
      setModel(info.model);
      setEngine(info.engine);
      setTransmission(info.transmission);
      setTrim(info.trim);
      setSeries(info.series);
      setVehicleInfo(info);

      // Update parts state with the fetched data
      setParts([...results]);
    } catch (error) {
      console.error("Error decoding VIN:", error);
      setError(error.message);
    }
  }

  return (
    <div className="flex justify-center flex-col bg-black bg-opacity-50 mt-20">
      <div className="flex justify-center mb-10 ">
        <h1 className="text-2xl lg:text-4xl font-semibold px-10 mt-10 text-white">
          <TypeWriter
            words={[
              "Welcome to Prestige Parts!",
              "To Get Started",
              "Enter Your VIN Below",
            ]}
            loop={true}
            delaySpeed={1000}
          />
          <Cursor cursorColor="#0096FF"></Cursor>
        </h1>
      </div>

      <div className="flex justify-center flex-col">
        <div className="flex justify-center mb-10">
          <input
            id="vin-decoder"
            type="text"
            placeholder="Enter VIN"
            className="border border-gray-400 p-2"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={handleVinDecode}
          >
            Decode VIN
          </button>
        </div>

        <div>
          {vehicleInfo && (
            <form className="mt-4 flex justify-center text-white text-semibold text-2xl">
              <input
                type="text"
                className="bg-black/50"
                value={year}
                readOnly
              />
              <input
                type="text"
                className="bg-black/50"
                value={make}
                readOnly
              />
              <input
                type="text"
                className="bg-black/50"
                value={model}
                readOnly
              />
              <input
                type="text"
                className="bg-black/50"
                value={series}
                readOnly
              ></input>
            </form>
          )}
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
            onClick={() => navigate("/parts")}
          >
            Continue
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default VinDecoder;


