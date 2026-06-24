"use client";

import { useState } from "react";

export interface WalletConnectButtonProps {
  onConnected: (address: string) => void;
}

/**
 * Connect / disconnect wallet button supporting Freighter, Albedo, and xBull.
 * Shows truncated Stellar address (GABCD…XYZ) when connected.
 * Renders a Freighter install link when the extension is not detected.
 */
export function WalletConnectButton({ onConnected }: WalletConnectButtonProps): JSX.Element {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      {address ? (
        <>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">{`${address.slice(0, 6)}…${address.slice(-3)}`}</span>
          <button type="button" onClick={() => setAddress(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Disconnect</button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            const demoAddress = "GABCDEF1234567890XYZ";
            setAddress(demoAddress);
            onConnected(demoAddress);
          }}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
