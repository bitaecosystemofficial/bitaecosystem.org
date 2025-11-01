import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, AlertCircle, Wallet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useBITBalance } from "@/contexts/BITBalanceContext";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { bsc, bscTestnet } from "wagmi/chains";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "@/config/contracts";
import usdtIcon from "@/assets/usdt-icon.png";
import usdcIcon from "@/assets/usdc-icon.png";
import bscIcon from "@/assets/bsc-icon.png";
import polygonIcon from "@/assets/polygon-icon.png";
import arbitrumIcon from "@/assets/arbitrum-icon.png";
import baseIcon from "@/assets/base-icon.png";
import bitLogo from "@/assets/bit-token-logo.png";

const BuyBitTab = () => {
  const [amount, setAmount] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("BSC");
  const [paymentMethod, setPaymentMethod] = useState<"USDT" | "USDC">("USDT");
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending: isPurchasing } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Determine if we're on BSC network (mainnet or testnet)
  const isBSCNetwork = chainId === bsc.id || chainId === bscTestnet.id;

  // Read BIT token balance
  const { data: bitBalance, refetch: refetchBitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  // Read contract price
  const { data: contractPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_PURCHASE,
    functionName: "pricePerBIT",
  });

  // Read minimum purchase
  const { data: minPurchase } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_PURCHASE,
    functionName: "minimumPurchase",
  });

  // Read contract BIT balance
  const { data: contractBitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "balanceOf",
    args: [CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`],
    query: { enabled: isBSCNetwork },
  });

  // Read total BIT sold (we'll calculate from initial supply minus current contract balance)
  const INITIAL_CONTRACT_SUPPLY = 2000900000; // 2.09 Billion BIT tokens (adjust as needed)

  // Read payment token allowance
  const paymentTokenAddress = paymentMethod === "USDT" ? CONTRACT_ADDRESSES.USDT_TOKEN : CONTRACT_ADDRESSES.USDC_TOKEN;
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: paymentTokenAddress as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: "allowance",
    args: address ? [address as `0x${string}`, CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  // Fixed presale end date - stored in localStorage to persist across refreshes
  const getPresaleEndDate = () => {
    const stored = localStorage.getItem("presaleEndDate");
    if (stored) {
      return new Date(stored);
    }
    // If not stored, create new end date 90 days from now
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 90);
    localStorage.setItem("presaleEndDate", endDate.toISOString());
    return endDate;
  };

  const PRESALE_END_DATE = getPresaleEndDate();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = PRESALE_END_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const pricePerBit = contractPrice ? Number(formatUnits(contractPrice as bigint, 18)) : 0.000108;
  const minimumPurchase = minPurchase ? Number(formatUnits(minPurchase as bigint, 9)) : 100000;

  const contractBalance = contractBitBalance ? Number(formatUnits(contractBitBalance as bigint, 9)) : 0;
  const totalSold = INITIAL_CONTRACT_SUPPLY - contractBalance;
  const soldPercentage = (totalSold / INITIAL_CONTRACT_SUPPLY) * 100;

  useEffect(() => {
    if (isSuccess) {
      refetchBitBalance();
      toast({
        title: "Purchase Successful! 🎉",
        description: `BIT tokens have been transferred to your wallet.`,
      });
      setAmount("");
    }
  }, [isSuccess]);

  const networks = [
    { name: "BSC", active: true, color: "from-yellow-500/20 to-yellow-500/5", icon: bscIcon },
    { name: "Polygon", active: false, color: "from-purple-500/20 to-purple-500/5", icon: polygonIcon },
    { name: "Arbitrum", active: false, color: "from-blue-500/20 to-blue-500/5", icon: arbitrumIcon },
    { name: "Base", active: false, color: "from-blue-400/20 to-blue-400/5", icon: baseIcon },
  ];

  const calculateBit = (usdAmount: string): string => {
    const amt = parseFloat(usdAmount);
    if (isNaN(amt) || amt <= 0) return "0";
    return (amt / pricePerBit).toLocaleString("en-US", { maximumFractionDigits: 0 });
  };

  const handleApprove = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // Check if on BSC network
    if (!isBSCNetwork) {
      const targetChain = bsc.id;
      toast({
        title: "Wrong Network",
        description: "Switching to BSC Mainnet...",
      });
      try {
        await switchChain({ chainId: targetChain });
      } catch (error) {
        toast({
          title: "Network Switch Failed",
          description: "Please switch to BSC Mainnet manually",
          variant: "destructive",
        });
        return;
      }
    }

    setIsApproving(true);
    try {
      const amountToApprove = parseUnits(amount, 18); // USDT/USDC has 18 decimals on BEP20

      await writeContract({
        address: paymentTokenAddress as `0x${string}`,
        abi: CONTRACT_ABIS.ERC20,
        functionName: "approve",
        args: [CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`, amountToApprove],
      } as any);

      toast({
        title: "Approval Submitted",
        description: "Please wait for the transaction to confirm...",
      });
    } catch (error: any) {
      toast({
        title: "Approval Failed",
        description: error?.message || "Failed to approve token",
        variant: "destructive",
      });
    } finally {
      setIsApproving(false);
      setTimeout(() => refetchAllowance(), 3000);
    }
  };

  const handleBuy = async () => {
    const bitAmount = parseFloat(calculateBit(amount).replace(/,/g, ""));

    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // Check if on BSC network
    if (!isBSCNetwork) {
      const targetChain = bsc.id;
      toast({
        title: "Wrong Network",
        description: "Switching to BSC Mainnet...",
      });
      try {
        await switchChain({ chainId: targetChain });
      } catch (error) {
        toast({
          title: "Network Switch Failed",
          description: "Please switch to BSC Mainnet manually",
          variant: "destructive",
        });
        return;
      }
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (bitAmount < minimumPurchase) {
      toast({
        title: "Minimum Purchase Required",
        description: `Minimum purchase is ${minimumPurchase.toLocaleString()} BIT tokens ($${(minimumPurchase * pricePerBit).toLocaleString()})`,
        variant: "destructive",
      });
      return;
    }

    if (selectedNetwork !== "BSC") {
      toast({
        title: "Network Coming Soon",
        description: `${selectedNetwork} network will be available soon`,
      });
      return;
    }

    try {
      const usdAmount = parseUnits(amount, 18); // USDT/USDC has 18 decimals on BEP20

      // Check if approval is needed
      const currentAllowance = (allowance as bigint) || BigInt(0);
      if (currentAllowance < usdAmount) {
        toast({
          title: "Approval Required",
          description: "Please approve the token spend first",
          variant: "destructive",
        });
        return;
      }

      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_PURCHASE as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_PURCHASE,
        functionName: "purchaseBIT",
        args: [paymentTokenAddress as `0x${string}`, usdAmount],
      } as any);

      toast({
        title: "Purchase Submitted",
        description: "Please wait for the transaction to confirm...",
      });
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error?.message || "Failed to purchase tokens",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Balance Display - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Your BIT Balance</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <img src={bitLogo} alt="BIT Token" className="w-8 h-8 md:w-12 md:h-12" />
                  <div>
                    <p className="text-2xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                      {bitBalance
                        ? Number(formatUnits(bitBalance as bigint, 9)).toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : "0"}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">BIT Tokens</p>
                  </div>
                </div>
              </div>
              <Wallet className="w-12 h-12 md:w-16 md:h-16 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-blue-500/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Contract Balance</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <img src={bitLogo} alt="BIT Token" className="w-8 h-8 md:w-12 md:h-12" />
                  <div>
                    <p className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {contractBalance.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </div>
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout: Total BIT Sold & Token Sale Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Total BIT Sold */}
        <Card className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-background border-purple-500/30">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-bold">Total BIT Sold</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Sold</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {totalSold.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Progress</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {soldPercentage.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary/50 rounded-full h-3 md:h-4 overflow-hidden border border-purple-500/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${soldPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </motion.div>
            </div>

            <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground">
              <span>0 BIT</span>
              <span>{INITIAL_CONTRACT_SUPPLY.toLocaleString()} BIT</span>
            </div>
          </CardContent>
        </Card>

        {/* Token Sale Timer */}
        <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
          <CardHeader className="text-center pb-3 md:pb-4">
            <CardTitle className="text-lg md:text-xl font-bold">Token Sale Ends In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-card border-2 border-primary/30 rounded-lg p-2 md:p-4 w-full">
                    <div className="text-xl md:text-3xl font-bold text-primary text-center tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mt-1 md:mt-2 uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center">
            <ShoppingBag className="w-7 h-7 mr-3 text-primary" />
            Purchase BIT Tokens
          </CardTitle>
          <CardDescription className="text-base">Enter your desired amount in USD</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Payment Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={paymentMethod === "USDT" ? "default" : "outline"}
                onClick={() => setPaymentMethod("USDT")}
                className={`h-16 font-semibold transition-all ${
                  paymentMethod === "USDT"
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <img src={usdtIcon} alt="USDT" className="w-6 h-6" />
                  <span className="text-xs">USDT-BEP20</span>
                </div>
              </Button>
              <Button
                variant={paymentMethod === "USDC" ? "default" : "outline"}
                onClick={() => setPaymentMethod("USDC")}
                className={`h-16 font-semibold transition-all ${
                  paymentMethod === "USDC"
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <img src={usdcIcon} alt="USDC" className="w-6 h-6" />
                  <span className="text-xs">USDC-BEP20</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Network Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Network</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {networks.map((network) => (
                <Button
                  key={network.name}
                  variant={selectedNetwork === network.name ? "default" : "outline"}
                  onClick={() => setSelectedNetwork(network.name)}
                  disabled={!network.active}
                  className={`h-16 font-semibold transition-all ${
                    selectedNetwork === network.name
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card/50 hover:bg-secondary/50"
                  } ${!network.active && "opacity-50 cursor-not-allowed"}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <img src={network.icon} alt={network.name} className="w-6 h-6" />
                    <span className="text-xs">{network.name}</span>
                    {network.active && (
                      <Badge className="mt-0.5 bg-green-500 text-white text-[10px] px-1 py-0">Active</Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-semibold">
              Amount ({paymentMethod})
            </Label>
            <div className="relative">
              {paymentMethod === "USDT" ? (
                <img src={usdtIcon} alt="USDT" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              ) : (
                <img src={usdcIcon} alt="USDC" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              )}
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-xl h-14 pl-12 font-semibold bg-background border-2 focus:border-primary"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Minimum purchase: {minimumPurchase.toLocaleString()} BIT (
              {(minimumPurchase * pricePerBit).toLocaleString()} {paymentMethod})
            </p>
          </div>

          {/* Purchase Summary */}
          {amount && parseFloat(amount) > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-secondary/30 border-2 border-primary/20 p-6 rounded-xl space-y-3"
            >
              <h3 className="font-bold text-lg mb-4">Purchase Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">You Pay:</span>
                  <div className="flex items-center gap-2">
                    <img src={paymentMethod === "USDT" ? usdtIcon : usdcIcon} alt={paymentMethod} className="w-4 h-4" />
                    <span className="text-xl font-bold">
                      {parseFloat(amount).toLocaleString()} {paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Price per BIT:</span>
                  <span className="font-semibold">${pricePerBit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Payment Method:</span>
                  <div className="flex items-center gap-1.5">
                    <img src={paymentMethod === "USDT" ? usdtIcon : usdcIcon} alt={paymentMethod} className="w-4 h-4" />
                    <span className="font-semibold">{paymentMethod}-BEP20</span>
                  </div>
                </div>
                <div className="border-t-2 border-border pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">You Receive:</span>
                    <span className="text-2xl font-bold text-primary">{calculateBit(amount)} BIT</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">{selectedNetwork}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Approve and Buy Buttons */}
          <div className="space-y-3">
            {amount && parseFloat(amount) > 0 && (
              <>
                {!allowance || (allowance as bigint) < parseUnits(amount, 18) ? (
                  <Button
                    onClick={handleApprove}
                    disabled={!address || isApproving || selectedNetwork !== "BSC"}
                    className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isApproving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Approve {paymentMethod}
                      </>
                    )}
                  </Button>
                ) : null}
              </>
            )}

            <Button
              onClick={handleBuy}
              disabled={
                !address ||
                isPurchasing ||
                isConfirming ||
                selectedNetwork !== "BSC" ||
                !amount ||
                parseFloat(amount) <= 0 ||
                !allowance ||
                (allowance as bigint) < parseUnits(amount || "0", 18)
              }
              className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              {isPurchasing || isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isConfirming ? "Confirming..." : "Processing..."}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {selectedNetwork !== "BSC" ? "Network Coming Soon" : !address ? "Connect Wallet" : "Buy BIT Tokens"}
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              <strong className="text-primary">Purchase Mechanics:</strong> Choose between USDT-BEP20 or USDC-BEP20 as
              payment method. Enter your desired amount and you will receive BIT tokens at a fixed rate of $
              {pricePerBit} per token. Minimum purchase requirement is {minimumPurchase.toLocaleString()} BIT tokens.
              Tokens will be transferred to your connected wallet address on the selected network (BSC, Polygon,
              Arbitrum, or Base).
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BuyBitTab;
