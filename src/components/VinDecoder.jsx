import React, { useState, useEffect } from "react";
import fetch from "node-fetch";

function VinDecoder() {
  // State variables
  const [vin, setVin] = useState("");
  const [error, setError] = useState(null);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [engines, setEngines] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [trims, setTrims] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(null);

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
      .then((response) => response.json())
      .then((data) => {
       
        const filteredMakes = data.Results.filter(
          (make) =>
            make.Make_Name === "DODGE" ||
            make.Make_Name === "RAM" ||
            make.Make_Name === "JEEP" ||
            make.Make_Name === "CHRYSLER" ||
            make.Make_Name === "FIAT"
        );
        setMakes(filteredMakes);
      })
      .catch((error) => {
        console.error("Error fetching makes:", error);
        setError(error.message);
      });
  }, []);

  // Fetch models based on selected manufacturer
  useEffect(() => {
    if (selectedMake) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${selectedMake}?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setModels(data.Results);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
          setError(error.message);
        });
    }
  }, [selectedMake]);

  // Fetch years based on selected manufacturer and model
  useEffect(() => {
    if (selectedMake && selectedModel) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${selectedMake}/model/${selectedModel}?format=json`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch years");
          }
          return response.json();
        })
        .then((data) => {
          setYears(data.Results);
        })
        .catch((error) => {
          console.error("Error fetching years:", error);
          setError(error.message);
        });
    }
  }, [selectedMake, selectedModel]);

  // Fetch engines based on selected manufacturer, model, and year
  useEffect(() => {
    if (selectedMake && selectedModel && selectedYear) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${selectedMake}/model/${selectedModel}/modelyear/${selectedYear}?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setModels(data.Results);
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
          setError(error.message);
        });
    }
  }, [selectedMake, selectedModel, selectedYear]);
  // Fetch transmissions based on selected manufacturer, model, year, and engine
  useEffect(() => {
    if (selectedMake && selectedModel && selectedYear && selectedEngine) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeModelYear/make/${selectedMake}/model/${selectedModel}/year/${selectedYear}/engine/${selectedEngine}?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setTransmissions(data.Results);
        })
        .catch((error) => {
          console.error("Error fetching transmissions:", error);
          setError(error.message);
        });
    }
  }, [selectedMake, selectedModel, selectedYear, selectedEngine]);

  // Fetch trims based on selected manufacturer, model, year, engine, and transmission
  useEffect(() => {
    if (
      selectedMake &&
      selectedModel &&
      selectedYear &&
      selectedEngine &&
      selectedTransmission
    ) {
      fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeModelYear/make/${selectedMake}/model/${selectedModel}/year/${selectedYear}/engine/${selectedEngine}/transmission/${selectedTransmission}?format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setTrims(data.Results);
        })
        .catch((error) => {
          console.error("Error fetching trims:", error);
          setError(error.message);
        });
    }
  }, [
    selectedMake,
    selectedModel,
    selectedYear,
    selectedEngine,
    selectedTransmission,
  ]);

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
      let info = {
        year:
          results.find((result) => result.Variable === "Model Year")?.Value ||
          "",
        make: results.find((result) => result.Variable === "Make")?.Value || "",
        model:
          results.find((result) => result.Variable === "Model")?.Value || "",
        series:
          results.find((result) => result.Variable === "Series")?.Value || "",
        engine:
          results.find((result) => result.Variable === "Displacement (L)")
            ?.Value || "",
        transmission:
          results.find((result) => result.Variable === "Transmission Style")
            ?.Value || "",
        trim: results.find((result) => result.Variable === "Trim")?.Value || "",
      };

      setVehicleInfo(info);
      console.log(info);
    } catch (error) {
      console.error("Error decoding VIN:", error);
      setError(error.message);
    }
  }

  // JSX content
  return (
   
      <div className="flex justify-center flex-col bg-custom-image h-[600px] w-[1500px] mx-auto overflow-y-scroll">
        {/* VIN input and decode button */}
        <div className="mt-10 flex justify-center">
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
        {/* Error message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* Display vehicle info */}
        {vehicleInfo && (
          <div className="mt-5 flex flex-row justify-between">
            <h2 className="font-bold">VIN: {vin}</h2>
            <p>
              <span className="font-bold">Year:</span> {vehicleInfo.year}
            </p>
            <p>
              <span className="font-bold">Make:</span> {vehicleInfo.make}
            </p>
            <p>
              <span className="font-bold">Model:</span> {vehicleInfo.model}
            </p>
            <p>
              <span className="font-bold">Engine:</span> {vehicleInfo.engine}
            </p>
            <p>
              <span className="font-bold">Transmission:</span>{" "}
              {vehicleInfo.transmission}
            </p>
            <p>
              <span className="font-bold">Trim:</span> {vehicleInfo.trim}
            </p>
          </div>
        )}
        {/* Select inputs for make, model, year, engine, transmission, and trim */}
        <div className="mt-20 flex flex-row justify-evenly">
          {/* Make */}
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select Make</option>
            {makes.map((make) => (
              <option key={make.Make_ID} value={make.Make_Name}>
                {make.Make_Name}
              </option>
            ))}
          </select>
          {/* Model */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_ID}>
                {model.Model_Name}
              </option>
            ))}
          </select>
          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year.ModelYear_ID} value={year.ModelYear_ID}>
                {year.ModelYear_Name}
              </option>
            ))}
          </select>
          {/* Engine */}
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
          >
            <option value="">Select Engine</option>
            {engines.map((engine) => (
              <option key={engine.Engine_ID} value={engine.Engine_ID}>
                {engine.Engine_Name}
              </option>
            ))}
          </select>
          {/* Transmission */}
          <select
            value={selectedTransmission}
            onChange={(e) => setSelectedTransmission(e.target.value)}
          >
            <option value="">Select Transmission</option>
            {transmissions.map((transmission) => (
              <option
                key={transmission.Transmission_ID}
                value={transmission.Transmission_ID}
              >
                {transmission.Transmission_Name}
              </option>
            ))}
          </select>
          {/* Trim */}
          <select>
            <option value="">Select Trim</option>
            {trims.map((trim) => (
              <option key={trim.Trim_ID} value={trim.Trim_ID}>
                {trim.Trim_Name}
              </option>
            ))}
          </select>
        </div>
      </div>
  );
}

export default VinDecoder;
