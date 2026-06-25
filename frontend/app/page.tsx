"use client";
import { useState } from "react";
import { MarketList } from "@/components/MarketList";
import { MarketStatus } from "@/lib/api";

const TABS: { label: string; status: MarketStatus }[] = [
  { label: "Active", status: "Open" },
  { label: "Upcoming", status: "Locked" },
  { label: "Resolved", status: "Resolved" },
];

export default function HomePage(): JSX.Element {
  const [tab, setTab] = useState<MarketStatus>("Open");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Boxing Markets</h1>

      {/* Tabs — full-width on mobile, auto-width on desktop */}
      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        {TABS.map(({ label, status }) => (
          <button
            key={status}
            onClick={() => setTab(status)}
            className={`flex-1 md:flex-none px-4 min-h-[44px] text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              tab === status
                ? "border-amber-400 text-amber-400"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* MarketList handles the responsive grid (1-col mobile, 2-col md, 3-col lg) */}
      <MarketList markets={[]} isLoading={false} filter={tab} />
    </div>
  );
}
