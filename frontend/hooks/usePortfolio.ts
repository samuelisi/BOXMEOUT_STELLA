import { Bet, Market, PortfolioSummary } from "@/lib/api";

export interface UsePortfolioResult {
  bets: Bet[];
  markets: Record<string, Market>;
  summary: PortfolioSummary | null;
  isLoading: boolean;
  refetch: () => void;
}

export function usePortfolio(address: string | null): UsePortfolioResult {
  // Data fetching wired up once API layer is implemented
  return {
    bets: [],
    markets: {},
    summary: null,
    isLoading: false,
    refetch: () => {},
  };
}
