export interface MarketOddsBarProps {
  poolA: bigint;
  poolB: bigint;
  fighterAName: string;
  fighterBName: string;
}

/**
 * Visual proportional bar showing Fighter A vs Fighter B pool split.
 * Color-coded with percentage labels. Falls back to 50/50 when both pools are 0.
 */
export function MarketOddsBar({ poolA, poolB, fighterAName, fighterBName }: MarketOddsBarProps): JSX.Element {
  const total = Number(poolA + poolB);
  const percentA = total === 0 ? 50 : Math.round((Number(poolA) / total) * 100);
  const percentB = 100 - percentA;

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex justify-between text-sm text-slate-600">
        <span>{fighterAName}</span>
        <span>{fighterBName}</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-l-full bg-emerald-500" style={{ width: `${percentA}%` }} />
        <div className="h-full rounded-r-full bg-slate-700" style={{ width: `${percentB}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{percentA}%</span>
        <span>{percentB}%</span>
      </div>
    </div>
  );
}
