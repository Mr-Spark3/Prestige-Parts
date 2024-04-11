import React, { useState } from "react";
import fetch from "node-fetch";

function VinDecoder() {
  const [vin, setVin] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [error, setError] = useState(null);

  async function handleVinDecode() {
    try {
      console.log("Sending request to API with VIN:", vin);
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      console.log("Received response from API:", response);

      if (!response.ok) {
        throw new Error("Failed to decode VIN");
      }

      const data = await response.json();
      const results = data.Results;

      if (!results || results.length === 0) {
        throw new Error("No results found for the VIN");
      }

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
          results.find((result) => result.Variable === "Engine")?.Value || "",
        transmission:
          results.find((result) => result.Variable === "Transmission")?.Value ||
          "",
        trim: results.find((result) => result.Variable === "Trim")?.Value || "",
      };

      setVehicleInfo(info);
      console.log(info);
    } catch (error) {
      console.error("Error decoding VIN:", error);
      setError(error.message);
    }
  }

  return (
    <div>
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {vehicleInfo && (
        <div className="mt-5 flex flex-row justify-evenly">
          <h2 className="font-bold">Vehicle Information</h2>
          <p><span className="font-bold">Year:</span> {vehicleInfo.year}</p>
          <p><span className="font-bold">Make:</span> {vehicleInfo.make}</p>
          <p><span className="font-bold">Model:</span> {vehicleInfo.model}</p>
          <p><span className="font-bold">Engine:</span> {vehicleInfo.engine}</p>
          <p><span className="font-bold">Transmission:</span> {vehicleInfo.transmission}</p>
          <p><span className="font-bold">Trim:</span> {vehicleInfo.trim}</p>
        </div>
      )}
    </div>
  );
}

export default VinDecoder;
