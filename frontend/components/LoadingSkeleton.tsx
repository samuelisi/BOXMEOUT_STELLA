export interface LoadingSkeletonProps {
  variant: "card" | "table" | "chart";
  count?: number;
}

/**
 * Animated placeholder rendered while data loads.
 * Each variant matches the dimensions of its real counterpart
 * (MarketCard, PortfolioTable row, MarketOddsChart) to prevent layout shift.
 */
export function LoadingSkeleton({ variant, count = 1 }: LoadingSkeletonProps): JSX.Element {
  const base = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="space-y-3">
      {base.map((item) => (
        <div key={`${variant}-${item}`} className={`animate-pulse rounded-xl border border-slate-200 bg-slate-100 ${variant === "chart" ? "h-24" : variant === "table" ? "h-12" : "h-24"}`} />
      ))}
    </div>
  );
}
