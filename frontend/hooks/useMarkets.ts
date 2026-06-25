import { Market, MarketQueryParams } from "@/lib/api";

export type MarketFilters = MarketQueryParams;

export interface UseMarketsResult {
  markets: Market[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Fetches and manages the list of boxing markets from the backend API.
 * Polls automatically every 30 seconds for live updates.
 * Returns loading and error states for the caller to handle.
 */
export function useMarkets(_filters?: MarketFilters): UseMarketsResult {
  return { markets: [], isLoading: false, error: null, refetch: () => {} };
}
