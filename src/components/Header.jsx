import { Link } from "react-router-dom";
import {  MailIcon, LocationMarkerIcon } from "@heroicons/react/solid";


export default function Header() {
  return (

    <div className="w-full h-10 border border-black/30 top-0 flex items-center sm:justify-center md:justify-center lg:justify-end mx-auto">
        <div className="flex mr-20">
        <h1 className="font-bold text-gray-500">Parts 720-513-3798 </h1>
        </div>

        <div className="flex gap-3">
        <div className="flex">
            <LocationMarkerIcon className="w-6 h-6 text-gray-500 " />
            <h1 className="ml-2 uppercase text-sm text-gray-500">Map</h1>
        </div>

        &nbsp; | &nbsp; 

      <div className="flex ">
        <MailIcon className="w-6 h-6 text-gray-500"/>
        <h1 className="ml-2 uppercase text-sm mr-20 text-gray-500 ">Contact</h1>
      </div>
      </div>
    </div>
  );
}
