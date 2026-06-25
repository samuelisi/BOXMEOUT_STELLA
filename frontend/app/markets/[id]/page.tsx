import { FighterCard } from "@/components/FighterCard";
import { BettingInterface } from "@/components/BettingInterface";
import { MarketOddsBar } from "@/components/MarketOddsBar";
import { MarketOddsChart } from "@/components/MarketOddsChart";
import { MarketStatusBadge } from "@/components/MarketStatusBadge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Market } from "@/lib/api";

interface Props {
  params: { id: string };
}

/** Placeholder market for layout rendering until API is wired up. */
function placeholderMarket(id: string): Market {
  return {
    id,
    contractAddress: "",
    fighterA: { name: "Fighter A", record: "20-0", nationality: "USA", weightClass: "Heavyweight" },
    fighterB: { name: "Fighter B", record: "18-2", nationality: "UK", weightClass: "Heavyweight" },
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    bettingEndsAt: new Date(Date.now() + 43200000).toISOString(),
    status: "Open",
    outcome: null,
    poolA: "0",
    poolB: "0",
    totalPool: "0",
    oracleAddress: "",
    createdBy: "",
  };
}

export default async function MarketDetailPage({ params }: Props): Promise<JSX.Element> {
  const market = placeholderMarket(params.id);
  const poolA = BigInt(market.poolA);
  const poolB = BigInt(market.poolB);
  const total = poolA + poolB;
  const oddsA = total === BigInt(0) ? 50 : Number((poolA * BigInt(100)) / total);
  const oddsB = 100 - oddsA;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold text-white">
          {market.fighterA.name} vs {market.fighterB.name}
        </h1>
        <MarketStatusBadge status={market.status} />
      </div>

      <CountdownTimer
        targetTimestamp={Math.floor(new Date(market.bettingEndsAt).getTime() / 1000)}
        label="Betting closes in"
      />

      {/* Fighter cards — stack on mobile, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row gap-4">
        <FighterCard fighter={market.fighterA} side="A" poolAmount={poolA} impliedOdds={oddsA} />
        <FighterCard fighter={market.fighterB} side="B" poolAmount={poolB} impliedOdds={oddsB} />
      </div>

      {/* Odds bar */}
      <MarketOddsBar
        poolA={poolA}
        poolB={poolB}
        fighterAName={market.fighterA.name}
        fighterBName={market.fighterB.name}
      />

      {/* Chart — full width */}
      <MarketOddsChart marketId={market.id} historicalOdds={[]} />

      {/* Betting interface — full width below chart */}
      <BettingInterface market={market} onBetPlaced={() => {}} />
    </div>
  );
}
