"use client";

export interface BetAmountInputProps {
  value: string;
  onChange: (val: string) => void;
  min: number;
  max: number;
  estimatedPayout: bigint | null;
}

/**
 * Controlled XLM amount input with min/max validation.
 * Shows estimated payout below the input updated in real time.
 * Displays inline validation error when value is out of [min, max] range.
 */
export function BetAmountInput({ value, onChange, min, max, estimatedPayout }: BetAmountInputProps): JSX.Element {
  const numericValue = Number(value || 0);
  const isInvalid = Number.isFinite(numericValue) && (numericValue < min || numericValue > max);

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-3">
      <label className="mb-2 block text-sm font-medium text-slate-700">Amount (XLM)</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />
      {estimatedPayout !== null ? (
        <p className="mt-2 text-sm text-slate-500">Estimated payout: {estimatedPayout.toString()} XLM</p>
      ) : null}
      {isInvalid ? <p className="mt-2 text-sm text-rose-600">Enter an amount between {min} and {max} XLM.</p> : null}
    </div>
  );
}
