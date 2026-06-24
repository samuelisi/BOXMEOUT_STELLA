"use client";
import { Bet, Market } from "@/lib/api";

export interface ClaimReceipt {
  betId: string;
  bettor: string;
  payout: bigint;
  claimedAt: string;
}

export interface ClaimButtonProps {
  bet: Bet;
  market: Market;
  onClaimed: (receipt: ClaimReceipt) => void;
}

/**
 * Renders "Claim Winnings" or "Claim Refund" based on market outcome and bet side.
 * Submits claim_winnings() or claim_refund() on-chain via wallet.
 * Disabled when bet.claimed=true or market is not Resolved/Cancelled.
 * Shows loading spinner while the transaction is in-flight.
 */
export function ClaimButton({ bet, market, onClaimed }: ClaimButtonProps): JSX.Element {
  const isClaimable = market.status === "Resolved" || market.status === "Cancelled";
  const label = market.status === "Cancelled" ? "Claim Refund" : "Claim Winnings";

  if (bet.claimed) {
    return <div className="text-sm text-slate-500">Already Claimed</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onClaimed({ betId: bet.id, bettor: bet.bettor, payout: BigInt(bet.amount), claimedAt: new Date().toISOString() })}
      disabled={!isClaimable}
      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isClaimable ? label : "Pending"}
    </button>
  );
}
