"use client";
import "intl-tel-input/styles";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const IntlTelInput = dynamic(() => import("intl-tel-input/reactWithUtils"), {
  ssr: false,
  loading: () => <Skeleton className="h-11 w-full" />,
});

function PhoneInput({
  setPhoneNumber,
}: {
  setPhoneNumber: (value: string) => void;
}) {
  return (
    <div>
      <IntlTelInput
        onChangeNumber={setPhoneNumber}
        initOptions={{
          initialCountry: "us",
          onlyCountries: ["us"],
          formatOnDisplay: true,
          allowDropdown: false,
          formatAsYouType: true,
          showFlags: true,
          strictMode: true,
          separateDialCode: true,
        }}
      />
    </div>
  );
}

export default PhoneInput;
