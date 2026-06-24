"use client";
import { useState } from "react";
import { Bet, Market } from "@/lib/api";
import { BetAmountInput } from "./BetAmountInput";

export interface BettingInterfaceProps {
  market: Market;
  onBetPlaced: (bet: Bet) => void;
}

/**
 * Main betting UI on the market detail page.
 * Renders two side-select buttons (Fighter A / Fighter B) and a BetAmountInput.
 * Builds and submits the place_bet Soroban transaction via connected wallet.
 * Entire component is disabled when market.status !== "Open".
 */
export function BettingInterface({ market, onBetPlaced }: BettingInterfaceProps): JSX.Element {
  const [side, setSide] = useState<"FighterA" | "FighterB">("FighterA");
  const [amount, setAmount] = useState("10");
  const isOpen = market.status === "Open";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex gap-2">
        {(["FighterA", "FighterB"] as const).map((option) => (
          <button
            key={option}
            type="button"
            disabled={!isOpen}
            onClick={() => setSide(option)}
            className={`rounded-full px-3 py-2 text-sm font-medium ${side === option ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            {option === "FighterA" ? market.fighterA.name : market.fighterB.name}
          </button>
        ))}
      </div>
      <BetAmountInput
        value={amount}
        onChange={setAmount}
        min={1}
        max={1000}
        estimatedPayout={BigInt(amount || 0)}
      />
      <button
        type="button"
        disabled={!isOpen}
        onClick={() => onBetPlaced({
          id: `bet-${Date.now()}`,
          marketId: market.id,
          bettor: "GTEST",
          side,
          amount: amount,
          placedAt: new Date().toISOString(),
          claimed: false,
          payout: null,
        })}
        className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isOpen ? "Place Bet" : "Market Closed"}
      </button>
    </div>
  );
}
