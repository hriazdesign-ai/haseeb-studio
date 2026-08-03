"use client";

import { useEffect, useState } from "react";
import {
  blocksMotionMultipliers,
  type BlocksMotionBreakpoint,
} from "@/lib/home-parallax-blocks-motion";

export function useBlocksMotionBreakpoint(): BlocksMotionBreakpoint {
  const [breakpoint, setBreakpoint] =
    useState<BlocksMotionBreakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint("mobile");
      else if (width < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
}

export function useBlocksMotionMultipliers() {
  const breakpoint = useBlocksMotionBreakpoint();
  return {
    breakpoint,
    ...blocksMotionMultipliers[breakpoint],
  };
}
