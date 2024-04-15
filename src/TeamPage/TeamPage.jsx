export default function TeamPage() {
  return (
    <div className="overflow-y-scroll h-screen">
      <div className="h-12 w-full bg-red-500 border border-black">
        <h1 className="flex text-[#FFFFFF] text-3xl mx-auto tracking-[10px] justify-center">
          Meet The Team
        </h1>
      </div>
      <h1 className="text-2xl mt-5 mb-10 flex justify-center border border-b-black">Management:</h1>
      <div className="m-3 w-[50%] flex flex-col items-center mx-auto gap-10">
        <div className="w-full h-full flex">
          <img
            src="images/parts-mgr-john.webp"
            alt="John"
            
          />
        </div>
      
      
        <div className="w-full h-full">
          <img
            src="images/parts-scott.webp"
            alt="Frankie"
          />
        </div>
      </div>
      <h1 className="text-2xl mt-5 mb-10 flex justify-center border border-b-black">Advisors:</h1>
      <div className="m-3 w-[50%] flex flex-col items-center mx-auto gap-10">
        <div className="w-full h-full flex">
          <img
            src="images/parts-andrew__1_.webp"
            alt="Andrew"
            
          />
        </div>
      
      
        <div className="w-full h-full">
          <img
            src="images/parts-frankie.webp"
            alt="Frankie"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="images/parts-jacob.webp"
            alt="Jacob"
          />
        </div>
      </div>
    </div>
  );
}
