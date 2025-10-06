"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date | string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const target = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(() => {
        const diff = target - Date.now();
        if (diff <= 0) {
          clearInterval(interval);
          return 0;
        }
        return diff;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const h = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const m = Math.floor((timeLeft / (1000 * 60)) % 60);
  const s = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="grid grid-cols-2 sm:flex gap-6 items-center">
      <div className="flex gap-2 items-center flex-col rounded-3xl py-5 px-6 md:min-w-[100px] bg-main-green/5">
        <span className="font-circular-medium text-black text-2xl">{d}</span>
        <span className="uppercase text-light-gray text-sm font-circular-light">
          Days
        </span>
      </div>
      <span className="text-black text-3xl sm:block hidden font-bold font-circular-bold">
        :
      </span>{" "}
      <div className="flex gap-2 items-center flex-col rounded-3xl py-5 px-6 md:min-w-[100px] bg-main-green/5">
        <span className="font-circular-medium text-black text-2xl">
          {h.toString().padStart(2, "0")}
        </span>
        <span className="uppercase text-light-gray text-sm font-circular-light">
          Hours
        </span>
      </div>
      <span className="text-black text-3xl sm:block hidden font-bold font-circular-bold">
        :
      </span>{" "}
      <div className="flex gap-2 items-center flex-col rounded-3xl py-5 px-6 md:min-w-[100px] bg-main-green/5">
        <span className="font-circular-medium text-black text-2xl">
          {m.toString().padStart(2, "0")}
        </span>
        <span className="uppercase text-light-gray text-sm font-circular-light">
          Minutes
        </span>
      </div>
      <span className="text-black text-3xl sm:block hidden font-bold font-circular-bold">
        :
      </span>{" "}
      <div className="flex gap-2 items-center flex-col rounded-3xl py-5 px-6 md:min-w-[100px] bg-main-green/5">
        <span className="font-circular-medium text-black text-2xl">
          {s.toString().padStart(2, "0")}
        </span>
        <span className="uppercase text-light-gray text-sm font-circular-light">
          Seconds
        </span>
      </div>
    </div>
  );
}
