function LayoutScreen() {
  return (
    <div className="hidden md:flex p-4 relative overflow-clip  bg-[url(/images/auth-layout.jpg)] bg-cover bg-center items-center max-h-[950px] h-full  justify-center rounded-[1.25rem]">
      <div className="bg-gradient-to-b inset-0 absolute from-dark-orange/37 to-main-blue"></div>
      <div className="w-full relative z-10 flex-col h-[80%] flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="text-white text-center  font-bold font-broke-bold text-[1.2rem] leading-12 md:text-[1.5rem] lg:text-[2rem]">
            Welcome to QuickEstimate.ai
          </h1>
          <span className="text-white text-center text-lg lg:text-lg font-dm ">
            Your Fast Track to Winning More Jobs.
          </span>
        </div>{" "}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-center  font-bold font-broke-bold text-base leading-10 md:text-[1.2rem] lg:text-[1.4rem]">
            Generate Estimate Instantly
          </h2>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-white text-center text-lg lg:text-lg font-dm ">
              Talk your bid.
            </span>{" "}
            <span className="text-white text-center text-lg lg:text-lg font-dm ">
              Close the job.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LayoutScreen;
