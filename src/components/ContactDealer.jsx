import React from "react";
import { PhoneIcon, LocationMarkerIcon, MailIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

function ContactDealer() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    window.location.href = `mailto:jordanhale03@gmail?subject=${formData.subject}&body=Hi, my name is ${formData.name}.
    ${formData.message} (${formData.email})`;
  };

  return (
    <div className="h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl justify-evenly mx-auto items-center relative">
      <h3 className="absolute top-24 uppercase tracking-[3px] text-black text-2xl">
        Get In Touch
      </h3>
      <div className="flex flex-col space-y-10 bg-black/20 p-20">
        <div className="space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-[#0096FF] h-7 w-7 animate-pulse" />
            <p className="text-2xl">+720-780-0965</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MailIcon className="text-[#0096FF] h-7 w-7 animate-pulse" />
            <p className="text-2xl">email@email.com</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <LocationMarkerIcon className="text-[#0096FF] h-7 w-7 animate-pulse" />
            <p className="text-2xl">200 Alpine st, Longmont CO 80501</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 w-fit mx-auto">
          <div className="flex space-x-2">
            <input {...register("name")} className="contactInput" type="text" placeholder="Name" />
            <input {...register("email")} className="contactInput" type="email" placeholder="Email" />
          </div>
          <input {...register("subject")} className="contactInput" type="text" placeholder="Subject" />
          <textarea {...register("message")} className="contactInput" placeholder="Message" />
          <button className="bg-[#0096Ff] py-5 px-10 rounded-md text-white font-bold text-lg" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactDealer;