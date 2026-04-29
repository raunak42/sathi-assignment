export default function App() {
  return (
    <div className="w-screen h-screen flex">
      {/* side bar */}
      <div className="w-[188px] min-w-[188px] bg-[#FDEFFD] h-full p-[16px] flex flex-col">
        <img alt="sathi_logo" src="/Icon.png" width={140}></img>
      </div>
      <div className="w-full h-full bg-white flex flex-col items-center justify-start">
        {/* Top bar */}
        <div className="w-full h-[64px] flex items-center justify-between px-[146px]">
          <h1 className="font-semibold text-[18px] leading-[140%] text-[#303030]">
            Gamification
          </h1>
        </div>
        <div className="bg-blue-200 w-full max-w-[1440px] h-full"></div>
      </div>
    </div>
  );
}
