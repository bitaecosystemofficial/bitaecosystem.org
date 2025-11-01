import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { toast } from "@/hooks/use-toast";
import type { Item } from "@/types/Item";

export const useExchange = () => {
  const { address } = useAccount();
  const [isExchanging, setIsExchanging] = useState(false);
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const exchangeItem = async (itemId: number) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsExchanging(true);

      await writeContract({
        address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
        abi: CONTRACT_ABIS.EXCHANGE_SHOP,
        functionName: "exchangeItem",
        args: [BigInt(itemId)],
      } as any);

      toast({
        title: "Exchange submitted",
        description: "Processing your exchange...",
      });

      return hash;
    } catch (error: any) {
      console.error("Exchange error:", error);
      toast({
        title: "Exchange failed",
        description: error.message || "Failed to exchange item",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsExchanging(false);
    }
  };

  const { data: totalItems } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "getTotalItems",
  });

  const getItem = (itemId: number) => {
    const { data } = useReadContract({
      address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
      abi: CONTRACT_ABIS.EXCHANGE_SHOP,
      functionName: "getItem",
      args: [BigInt(itemId)],
    });

    return data as Item | undefined;
  };

  return {
    exchangeItem,
    isExchanging: isExchanging || isConfirming,
    exchangeHash: hash,
    totalItems: totalItems as bigint | undefined,
    getItem,
  };
};
