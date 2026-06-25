"use client";
import { useState } from "react";
import { Bet, BetSide, Market } from "@/lib/api";
import { BetAmountInput } from "./BetAmountInput";

export interface BettingInterfaceProps {
  market: Market;
  onBetPlaced: (bet: Bet) => void;
}

export function BettingInterface({ market, onBetPlaced: _ }: BettingInterfaceProps): JSX.Element {
  const [side, setSide] = useState<BetSide | null>(null);
  const [amount, setAmount] = useState("");
  const disabled = market.status !== "Open";

  return (
    <div className="bg-gray-800 rounded-xl p-4 w-full space-y-4">
      <h2 className="text-base font-semibold text-white">Place Bet</h2>

      {disabled && (
        <p className="text-sm text-yellow-400">Betting is {market.status.toLowerCase()}.</p>
      )}

      {/* Fighter select */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSide("FighterA")}
          disabled={disabled}
          className={`h-11 rounded-lg text-sm font-medium transition-colors ${
            side === "FighterA"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          } disabled:opacity-50`}
        >
          {market.fighterA.name}
        </button>
        <button
          onClick={() => setSide("FighterB")}
          disabled={disabled}
          className={`h-11 rounded-lg text-sm font-medium transition-colors ${
            side === "FighterB"
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          } disabled:opacity-50`}
        >
          {market.fighterB.name}
        </button>
      </div>

      <BetAmountInput
        value={amount}
        onChange={setAmount}
        min={1}
        max={10000}
        estimatedPayout={null}
      />

      <button
        disabled={disabled || !side || !amount}
        className="w-full h-11 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-semibold rounded-lg transition-colors"
      >
        Confirm Bet
      </button>
    </div>
  );
}
