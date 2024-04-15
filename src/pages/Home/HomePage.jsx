import VinDecoder from "../../components/VinDecoder";
// import VehicleLookUp from "../../components/VehicleLookUp";

export default function HomePage() {
  return (
    <>
      <div className="h-screen">
        <div className="h-12 w-full bg-red-500 border border-black">
          <h1 className="flex text-[#FFFFFF] text-3xl justify-center mx-auto tracking-[10px]">
            Prestige Parts
          </h1>
        </div>
        <div>
          <VinDecoder className="border border-black text-blue-600" />
        </div>
      </div>
    </>
  );
}
