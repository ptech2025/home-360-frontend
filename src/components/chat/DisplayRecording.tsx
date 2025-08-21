"use client";

import { motion, Variants } from "motion/react";
import { formatTimer } from "@/utils/funcs";
import { Loader2, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
type AudioWaveProps = {
  bars?: number; // number of bars
  color?: string; // bar color
  width?: number; // bar width (px)
  height?: number; // max bar height (px)
  gap?: number; // gap between bars (px)
  speed?: number; // animation speed (seconds)
};

type LoadingDotsProps = {
  className?: string;
};

type DisplayRecordingProps = {
  stopRecording: () => void;
  isTranscribing: boolean;
  timer: number;
};

export function LoadingDots({ className }: LoadingDotsProps) {
  const dotVariants: Variants = {
    jump: {
      y: -0.6,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: 0.15 }}
      className="flex items-center justify-center gap-2"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className={` rounded-full  ${className}`}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
}

function AudioWave({
  bars = 5,
  color = "#3b82f6", // tailwind blue-500
  width = 6,
  height = 40,
  gap = 4,
  speed = 0.6,
}: AudioWaveProps) {
  return (
    <div className="flex items-end w-full " style={{ gap }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width,
            height,
            backgroundColor: color,
            borderRadius: "4px",
            flex: 1,
          }}
          animate={{
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15, // stagger each bar
          }}
        />
      ))}
    </div>
  );
}

function DisplayRecording({
  timer,
  isTranscribing,
  stopRecording,
}: DisplayRecordingProps) {
  return (
    <div className="rounded-xl min-h-12 shadow-sm p-3 flex items-center justify-center">
      {isTranscribing ? (
        <div className="flex items-center gap-4 justify-center w-full">
          <span className="text-main-blue text-lg lg:text-xl font-medium ">
            Transcribing
          </span>
          <Loader2 className="text-main-blue animate-spin size-4" />
        </div>
      ) : (
        <div className="flex  items-center gap-3 justify-between w-full">
          <span className="shrink-0 text-main-blue text-base">
            {formatTimer(timer)}
          </span>
          <div className="px-1 min-w-0 overflow-x-clip  flex-1 animate-pulse">
            <AudioWave
              bars={50}
              color="#485a74"
              width={4}
              height={36}
              gap={4}
            />
          </div>
          <Button
            size={"icon"}
            type="button"
            onClick={stopRecording}
            className="rounded-full hover:bg-main-blue/10  shrink-0 border-dark-orange bg-transparent border-2"
          >
            <Square className="size-4 fill-dark-orange stroke-dark-orange" />
          </Button>
        </div>
      )}
    </div>
  );
}
export default DisplayRecording;
