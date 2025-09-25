import NewsLetterForm from "../forms/NewsLetterForm";

function Newsletter() {
  return (
    <div className="flex custom-container flex-col justify-center items-center gap-10 w-full">
      <div className="flex flex-col gap-1 justify-center items-center">
        <h4 className="text-3xl text-center md:text-[2.5rem] font-bold font-broke-bold text-main-blue">
          QuickEstimate.<span className="text-main-yellow">ai</span>
        </h4>
        <span className="text-main-blue/80 text-sm text-center">
          Talk your bid. Close your job
        </span>
      </div>
      <div className=" p-6  md:p-8 lg:p-12 w-full bg-light-blue rounded-[20px] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col max-w-[600px] gap-4 items-center justify-center md:items-start md:justify-start">
          <h5 className="text-main-blue  font-broke-bold text-3xl md:text-[2.5rem] text-center md:text-start">
            Sign Up for Our Updates
          </h5>
          <p className="text-sm text-[#808080] text-center md:text-start">
            Stay up-to-date with the latest industry insights, product updates,
            and exclusive offers by subscribing to our newsletter.
          </p>
        </div>
        <NewsLetterForm />
      </div>
    </div>
  );
}
export default Newsletter;
