import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import TypeWriter from "./TypeWriter";

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
  // State variables
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
  // const [makes, setMakes] = useState([]);
  // const [models, setModels] = useState([]);
  // const [years, setYears] = useState([]);
  // const [selectedMake, setSelectedMake] = useState("");
  // const [selectedModel, setSelectedModel] = useState("");
  // const [selectedYear, setSelectedYear] = useState("null");

  // VIN decode function
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

      // Extract vehicle info
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
    } catch (error) {
      console.error("Error decoding VIN:", error);
      setError(error.message);
    }
  }

  // useEffect(() => {
  //   fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const filteredMakes = data.Results.filter(
  //         (make) =>
  //           make.Make_Name === "DODGE" ||
  //           make.Make_Name === "RAM" ||
  //           make.Make_Name === "JEEP" ||
  //           make.Make_Name === "CHRYSLER" ||
  //           make.Make_Name === "FIAT"
  //       );
  //       setMakes(filteredMakes);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching makes:", error);
  //       setError(error.message);
  //     });
  // }, []);

  // // Fetch models for selected make
  // useEffect(() => {
  //   console.log(selectedMake);
  //   if (selectedMake) {
  //     fetch(
  //       `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${selectedMake}?format=json`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setModels(data.Results);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching models:", error);
  //         setError(error.message);
  //       });
  //   }
  // }, [selectedMake]);

  // // Fetch model years for selected make and model
  // useEffect(() => {
  //   if (selectedMake && selectedModel && selectedYear) {
  //     fetch(
  //       `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/${selectedMake}/${selectedModel}/${year}?format=json`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setYears(data.Results);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching model years:", error);
  //         setError(error.message);
  //       });
  //   }
  // }, [selectedMake, selectedModel, selectedYear]);
  return (
    <div className="flex justify-center flex-col bg-black bg-opacity-50 mt-20">
      <div className="flex justify-center mb-10 ">
        {/* Use Typewriter component with proper words array */}
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

      {/* VIN input and decode button */}
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
              <input type="text" className="bg-black/50" value={year} readOnly />
              <input type="text" className="bg-black/50" value={make} readOnly />
              <input type="text" className="bg-black/50" value={model} readOnly />
              <input type="text" className="bg-black/50" value={series} readOnly></input>
            </form>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Manual selection dropdowns */}
      {/* <div>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option key="default-make" value="">
            Select Make
          </option>
          {makes.map((make) => (
            <option key={make.Make_ID.toString()} value={make.Make_Name}>
              {make.Make_Name}
            </option>
          ))}
        </select>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option key="default-model" value="">
            Select Model
          </option>
          {models.map((model) => (
            <option key={model.Model_ID.toString()} value={model.Model_Name}>
              {model.Model_Name}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option key="default-year" value="">
            Select Year
          </option>
          {years &&
            years.length > 0 &&
            years.map((year, index) => (
              <option key={index} value={year.ModelYear}>
                {year.ModelYear}
              </option>
            ))}
        </select>
        <select value={engine} onChange={(e) => setEngine(e.target.value)}>
          <option key="default" value="">
            Select Engine
          </option>
          {/* Populate options dynamically */}
      {/* </select>
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option key="default" value="">
            Select Transmission
          </option>
          {/* Populate options dynamically */}
      {/* </select>
        <select value={trim} onChange={(e) => setTrim(e.target.value)}>
          <option key="default" value="">
            Select Trim
          </option> */}
      {/* Populate options dynamically */}
      {/* </select> */}
      {/* </div> */}
    </div>
  );
}
export default VinDecoder;
