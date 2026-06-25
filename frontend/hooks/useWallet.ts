"use client";
import { useState } from "react";

export interface UseWalletResult {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
}

export function useWallet(): UseWalletResult {
  const [address, setAddress] = useState<string | null>(null);

  async function connect() {
    // Freighter integration point — stub returns placeholder
    setAddress("GABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }

  function disconnect() {
    setAddress(null);
  }

  async function signTransaction(_xdr: string): Promise<string> {
    throw new Error("Wallet not connected");
  }

  return { address, isConnected: address !== null, connect, disconnect, signTransaction };
}
