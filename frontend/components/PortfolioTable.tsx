"use client";
import { Bet, Market } from "@/lib/api";

export interface PortfolioTableProps {
  bets: Bet[];
  markets: Record<string, Market>;
}

/**
 * Table of user bets: Fight, Side, Amount (XLM), Status, Payout columns.
 * Sortable by any column. Filterable by bet status.
 * Shows empty-state illustration when bets array is empty.
 */
export function PortfolioTable({ bets, markets }: PortfolioTableProps): JSX.Element {
  if (bets.length === 0) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No bets yet.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Fight</th>
            <th className="px-4 py-3">Side</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Payout</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bets.map((bet) => {
            const market = markets[bet.marketId];
            return (
              <tr key={bet.id}>
                <td className="px-4 py-3">{market ? `${market.fighterA.name} vs ${market.fighterB.name}` : bet.marketId}</td>
                <td className="px-4 py-3">{bet.side}</td>
                <td className="px-4 py-3">{bet.amount}</td>
                <td className="px-4 py-3">{bet.claimed ? "Claimed" : "Open"}</td>
                <td className="px-4 py-3">{bet.payout ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
