// ABI imports
import BITTokenPurchaseABI from "@/contracts/abis/BITTokenPurchase.json";
import BITStakingABI from "@/contracts/abis/BITStaking.json";
import ExchangeShopABI from "@/contracts/abis/ExchangeShop.json";
import BITClaimAirdropABI from "@/contracts/abis/BITClaimAirdrop.json";
import ERC20ABI from "@/contracts/abis/ERC20.json";

// Smart Contract Addresses on BSC Network
export const CONTRACT_ADDRESSES = {
  // BIT Token Purchase Contract
  BIT_PURCHASE: "0x56F2D1Ce68F7Be313E8e5400BB5E02Fd032cA1cb" as `0x${string}`, // Replace with deployed address

  // BIT Staking Contract
  BIT_STAKING: "0x1D361114074ED04e4BdC763AbF5c6218aB0e178F" as `0x${string}`, // Replace with deployed address

  // Exchange Shop Contract
  EXCHANGE_SHOP: "0xAE274E1dB3ac615CCf1E449aF7893612f5aE50C8" as `0x${string}`, // DEPLOY THIS CONTRACT AND UPDATE ADDRESS

  // Claim Airdrop Contract
  CLAIM_AIRDROP: "0x0000000000000000000000000000000000000000" as `0x${string}`, // DEPLOY THIS CONTRACT AND UPDATE ADDRESS

  // Token Addresses on BSC
  BIT_TOKEN: "0xd3bDe17EbD27739cF5505Cd58Ecf31cB628E469c" as `0x${string}`, // Replace with BIT token address
  USDT_TOKEN: "0x55d398326f99059fF775485246999027B3197955" as `0x${string}`, // USDT on BSC
  USDC_TOKEN: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" as `0x${string}`, // USDC on BSC

  // Receiver Wallet for USDT/USDC payments
  RECEIVER_WALLET: "0x2cCbfa0E1B41b121F86F70b991531F7Bbf6Ac908" as `0x${string}`, // Replace with your receiver wallet
};

export const CONTRACT_ABIS = {
  BIT_PURCHASE: BITTokenPurchaseABI,
  BIT_STAKING: BITStakingABI,
  EXCHANGE_SHOP: ExchangeShopABI,
  CLAIM_AIRDROP: BITClaimAirdropABI,
  ERC20: ERC20ABI,
};

export const SUPPORTED_CHAINS = {
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
} as const;

// Network configurations
export const SUPPORTED_NETWORKS = {
  BSC: {
    chainId: 56,
    name: "BNB Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
  },
  BSC_TESTNET: {
    chainId: 97,
    name: "BNB Smart Chain Testnet",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorer: "https://testnet.bscscan.com",
  },
};
