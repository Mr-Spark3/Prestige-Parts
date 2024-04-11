
import VinDecoder from '../../components/VinDecoder';

export default function HomePage() {
 

  return (
    <>
      <div className="h-screen">
        <div className="h-12 w-full bg-[#0080FF] border border-black">
          <h1 className="flex text-[#FFFFFF] text-3xl justify-center mx-auto tracking-[10px]">
            Prestige Parts
          </h1>
        </div>
        <div>
          <VinDecoder className="border border-black text-blue-600"/>
        </div>
      </div>
    </>
  );
}