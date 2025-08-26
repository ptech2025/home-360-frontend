import { cn } from "@/lib/utils";
import parsePhoneNumberFromString from "libphonenumber-js";
import { GlobeIcon } from "lucide-react";
import Flag from "react-world-flags";

function DisplayPhoneNumber({
  phoneNumber,
  className,
}: {
  phoneNumber: string;
  className?: string;
}) {
  let formattedNumber = phoneNumber;
  let countryCode = "ZZ";

  const parsedNumber = parsePhoneNumberFromString(phoneNumber);

  if (parsedNumber) {
    formattedNumber = parsedNumber.formatNational();
    if (parsedNumber.country) {
      countryCode = parsedNumber.country;
    }
  }

  return (
    <div className="text-main-blue flex items-center gap-2 max-md:flex-wrap">
      {countryCode === "ZZ" ? (
        <GlobeIcon className="h-auto w-4 shrink-0" strokeWidth={1.25} />
      ) : (
        <Flag code={countryCode} className="h-auto w-6 shrink-0" />
      )}
      <span
        className={cn(
          "inline-block text-sm text-nowrap md:min-w-28",
          className
        )}
      >
        {formattedNumber}
      </span>
    </div>
  );
}

export default DisplayPhoneNumber;
