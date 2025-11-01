import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";

export const useIsContractOwner = () => {
  const { address } = useAccount();

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.EXCHANGE_SHOP,
    abi: CONTRACT_ABIS.EXCHANGE_SHOP,
    functionName: "owner",
  });

  return {
    isOwner: address && owner ? address.toLowerCase() === (owner as string).toLowerCase() : false,
    owner: owner as string | undefined,
  };
};
