import Image from "next/image";

function HomePage() {
  return (
    <section className="min-h-dvh p-10 grid place-items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-purple-800 text-3xl font-black">
            Quick Estimate AI
          </h1>
          <div className="relative px-12 w-max before:content-[''] after:content-[''] after:absolute before:absolute after:top-1/2 before:top-1/2 before:left-0 after:right-0 after:-translate-y-1/2 after:w-8 after:h-px before:-translate-y-1/2 before:w-8 before:h-px before:bg-gradient-to-r after:bg-gradient-to-l after:from-black/0  before:from-black/0 before:via-purple-400 after:via-purple-400 after:to-purple-600 before:to-purple-600">
            <span className="block  text-center text-black text-[0.875rem] font-sato-bold font-bold uppercase">
              Coming Soon
            </span>
          </div>
        </div>
        <Image
          src={"/construction.svg"}
          alt="construction image"
          width={400}
          height={400}
        />
      </div>
    </section>
  );
}
export default HomePage;
