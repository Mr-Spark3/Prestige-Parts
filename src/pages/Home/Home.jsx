import { checkToken } from "../../utilities/users-service";

export default function HomePage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <>
      <div className="h-screen">
        <div className="absolute h-12 w-full bg-[#0080FF] border border-black">
          <h1 className="flex text-[#FFFFFF] text-3xl justify-center mx-auto tracking-[10px]">
            Prestige Parts
          </h1>
        </div>
      </div>
      {/* <h1></h1>
      <button onClick={handleCheckToken}>Check When My Login Expires</button> */}
    </>
  );
}
