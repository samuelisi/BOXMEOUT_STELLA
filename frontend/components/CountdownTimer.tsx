"use client";

import { useEffect, useState } from "react";

export interface CountdownTimerProps {
  targetTimestamp: number; // Unix seconds
  label: string;           // e.g. "Betting closes in"
}

/**
 * Live countdown to a Unix timestamp, updated every second.
 * Displays HH:MM:SS format with the label prefix.
 * Switches to "LIVE" text once targetTimestamp is reached.
 */
export function CountdownTimer({ targetTimestamp, label }: CountdownTimerProps): JSX.Element {
  const [now, setNow] = useState(() => Date.now() / 1000);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now() / 1000), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const remaining = Math.max(0, targetTimestamp - Math.floor(now));
  const hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <div className="text-sm text-slate-600">
      {label}: {remaining <= 0 ? "LIVE" : `${hours}:${minutes}:${seconds}`}
    </div>
  );
}
