import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import { toast } from "@/hooks/use-toast";

export const useTokenApproval = () => {
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const approveTokens = async (amount: bigint) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return false;
    }

    try {
      setIsApproving(true);

      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_TOKEN,
        abi: CONTRACT_ABIS.ERC20,
        functionName: "approve",
        args: [CONTRACT_ADDRESSES.EXCHANGE_SHOP, amount],
      } as any);

      toast({
        title: "Approval submitted",
        description: "Please confirm the transaction in your wallet",
      });

      return true;
    } catch (error: any) {
      console.error("Approval error:", error);
      toast({
        title: "Approval failed",
        description: error.message || "Failed to approve tokens",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  return {
    approveTokens,
    isApproving: isApproving || isConfirming,
    approvalHash: hash,
  };
};
