import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Loader2, TrendingUp, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { bsc, bscTestnet } from 'wagmi/chains';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import bitLogo from '@/assets/bit-token-logo.png';

const StakingTab = () => {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending: isStaking } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const isBSCNetwork = chainId === bsc.id || chainId === bscTestnet.id;

  const UNSTAKE_FEE = 2;
  const EARLY_UNSTAKE_FEE = 10;

  // BIT Token balance
  const { data: bitBalance, refetch: refetchBitBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  // Allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
    abi: CONTRACT_ABIS.ERC20,
    functionName: 'allowance',
    args: address ? [address as `0x${string}`, CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`] : undefined,
    query: { enabled: !!address && isBSCNetwork },
  });

  // Total staked per user
  const { data: totalUserStaked, refetch: refetchTotalStaked } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'userTotalStaked',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  // User stakes
  const { data: userStakes, refetch: refetchUserStakes } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'getUserStakes',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  // Rewards
  const { data: totalRewardsData, refetch: refetchRewards } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'getTotalRewards',
    args: address ? [address as `0x${string}`] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (isSuccess) {
      refetchBitBalance();
      refetchTotalStaked();
      refetchUserStakes();
      refetchRewards();
      setStakeAmount('');
      setSelectedPool(null);
    }
  }, [isSuccess]);

  const { data: pool0Data } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'stakingPools',
    args: [0],
  });

  const { data: pool1Data } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'stakingPools',
    args: [1],
  });

  const { data: pool2Data } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_STAKING,
    abi: CONTRACT_ABIS.BIT_STAKING,
    functionName: 'stakingPools',
    args: [2],
  });

  const stakingPools = [
    {
      id: 0,
      days: pool0Data ? Number(pool0Data[0]) : 180,
      apy: pool0Data ? Number(pool0Data[1]) : 12,
      minStake: pool0Data ? Number(formatUnits(pool0Data[2], 9)) : 100000,
      totalStaked: pool0Data ? Number(formatUnits(pool0Data[3], 9)) : 0,
      active: pool0Data ? pool0Data[4] : true,
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 1,
      days: pool1Data ? Number(pool1Data[0]) : 240,
      apy: pool1Data ? Number(pool1Data[1]) : 18,
      minStake: pool1Data ? Number(formatUnits(pool1Data[2], 9)) : 500000,
      totalStaked: pool1Data ? Number(formatUnits(pool1Data[3], 9)) : 0,
      active: pool1Data ? pool1Data[4] : true,
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
      popular: true,
    },
    {
      id: 2,
      days: pool2Data ? Number(pool2Data[0]) : 365,
      apy: pool2Data ? Number(pool2Data[1]) : 25,
      minStake: pool2Data ? Number(formatUnits(pool2Data[2], 9)) : 1000000,
      totalStaked: pool2Data ? Number(formatUnits(pool2Data[3], 9)) : 0,
      active: pool2Data ? pool2Data[4] : true,
      color: 'from-primary/20 to-primary/5',
      borderColor: 'border-primary/30',
    },
  ];

  const totalStakedAllPools = stakingPools.reduce((sum, pool) => sum + pool.totalStaked, 0);

  const calculateRewards = (amount: string, pool: typeof stakingPools[0]) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return '0';
    const dailyRate = pool.apy / 100 / 365;
    const totalReward = amt * dailyRate * pool.days;
    return totalReward.toFixed(2);
  };

  const handleApprove = async () => {
    if (!address) {
      toast({ title: 'Wallet Not Connected', description: 'Please connect your wallet', variant: 'destructive' });
      return;
    }

    if (!isBSCNetwork) {
      try {
        await switchChain({ chainId: bsc.id });
      } catch {
        toast({ title: 'Network Switch Failed', description: 'Switch to BSC manually', variant: 'destructive' });
        return;
      }
    }

    setIsApproving(true);
    try {
      const amountToApprove = parseUnits(stakeAmount || '0', 9);
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_TOKEN as `0x${string}`,
        abi: CONTRACT_ABIS.ERC20,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`, amountToApprove],
      } as any);
      toast({ title: 'Approval Submitted', description: 'Waiting for confirmation...' });
    } catch (error: any) {
      toast({ title: 'Approval Failed', description: error?.message || 'Approval error', variant: 'destructive' });
    } finally {
      setIsApproving(false);
      setTimeout(() => refetchAllowance(), 4000);
    }
  };

  const handleStake = async () => {
    if (!address || selectedPool === null) {
      toast({ title: 'Select Pool', description: 'Choose a staking pool first', variant: 'destructive' });
      return;
    }

    const pool = stakingPools[selectedPool];
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount < pool.minStake) {
      toast({
        title: 'Invalid Amount',
        description: `Minimum stake: ${pool.minStake.toLocaleString()} BIT`,
        variant: 'destructive',
      });
      return;
    }

    const amountToStake = parseUnits(stakeAmount, 9);
    const currentAllowance = allowance as bigint || BigInt(0);
    if (currentAllowance < amountToStake) {
      toast({ title: 'Approval Required', description: 'Please approve BIT token spend first', variant: 'destructive' });
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_STAKING,
        functionName: 'stake',
        args: [BigInt(pool.id), amountToStake],
      } as any);
      toast({ title: 'Staking Submitted', description: 'Transaction pending confirmation...' });
    } catch (error: any) {
      toast({ title: 'Staking Failed', description: error?.message || 'Transaction failed', variant: 'destructive' });
    }
  };

  const handleUnstake = async (stakeId: number) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_STAKING as `0x${string}`,
        abi: CONTRACT_ABIS.BIT_STAKING,
        functionName: 'unstake',
        args: [BigInt(stakeId)],
      } as any);
      toast({ title: 'Unstake Submitted', description: 'Waiting for confirmation...' });
    } catch (error: any) {
      toast({ title: 'Unstake Failed', description: error?.message || 'Unstake failed', variant: 'destructive' });
    }
  };

  const totalStaked = totalUserStaked ? Number(formatUnits(totalUserStaked as bigint, 9)) : 0;
  const totalRewards = totalRewardsData ? Number(formatUnits(totalRewardsData as bigint, 9)) : 0;
  const balance = bitBalance ? Number(formatUnits(bitBalance as bigint, 9)) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Your Balance</p>
                <p className="text-xl md:text-3xl font-bold">{balance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">BIT</p>
              </div>
              <Wallet className="w-10 h-10 md:w-12 md:h-12 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-blue-500/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Staked</p>
                <p className="text-xl md:text-3xl font-bold">{totalStaked.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">BIT</p>
              </div>
              <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-green-500/30">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Rewards</p>
                <p className="text-xl md:text-3xl font-bold">{totalRewards.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">BIT</p>
              </div>
              <img src={bitLogo} alt="BIT" className="w-10 h-10 md:w-12 md:h-12 opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staking Pools */}
      <div className="grid gap-4 md:grid-cols-3">
        {stakingPools.map((pool, index) => (
          <Card key={pool.id} className={`relative border ${pool.borderColor} bg-gradient-to-b ${pool.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base md:text-lg">
                <span>{pool.days}-Day Pool</span>
                {pool.popular && <Badge className="bg-purple-500/20 text-purple-400 text-xs">Popular</Badge>}
              </CardTitle>
              <CardDescription className="text-sm md:text-base font-bold">APY: {pool.apy}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-4">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Min Stake:</span>
                <span className="font-medium">{pool.minStake.toLocaleString()} BIT</span>
              </div>
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Total Staked:</span>
                <span className="font-medium">{pool.totalStaked.toLocaleString()} BIT</span>
              </div>
              <Button
                className="w-full mt-2"
                size="sm"
                variant={selectedPool === index ? 'default' : 'outline'}
                onClick={() => setSelectedPool(index)}
              >
                {selectedPool === index ? 'Selected' : 'Select Pool'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stake Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Stake Your BIT Tokens</CardTitle>
          <CardDescription>Enter amount and stake into selected pool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm md:text-base">Amount (BIT)</Label>
            <Input
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount"
              type="number"
              min="0"
              className="text-base md:text-lg h-12"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs md:text-sm text-muted-foreground">
            <span>Balance: {balance.toLocaleString()} BIT</span>
            {selectedPool !== null && (
              <span className="text-green-600 dark:text-green-400">
                Est. Rewards: {calculateRewards(stakeAmount, stakingPools[selectedPool])} BIT
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              disabled={isApproving}
              onClick={handleApprove}
              variant="outline"
              className="flex-1 h-11"
            >
              {isApproving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Approve
            </Button>
            <Button
              disabled={isStaking || selectedPool === null}
              onClick={handleStake}
              className="flex-1 h-11"
            >
              {isStaking ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Stake
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unstaking Fees Info */}
      <Card className="bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-background border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Unstaking Fees
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-xs md:text-sm text-muted-foreground">Normal Unstaking Fee:</span>
            <span className="text-sm md:text-base font-bold text-orange-600 dark:text-orange-400">{UNSTAKE_FEE}%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
            <span className="text-xs md:text-sm text-muted-foreground">Early Unstaking Fee:</span>
            <span className="text-sm md:text-base font-bold text-red-600 dark:text-red-400">{EARLY_UNSTAKE_FEE}%</span>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Note: Early unstaking before lock period ends incurs a higher fee
          </p>
        </CardContent>
      </Card>

      {/* Your Active Stakes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Your Active Stakes</CardTitle>
        </CardHeader>
        <CardContent>
          {userStakes && (userStakes as any[]).length > 0 ? (
            <div className="space-y-3">
              {(userStakes as any[]).map((stake, index) => {
                const pool = stakingPools[Number(stake.poolId)];
                const amount = Number(formatUnits(stake.amount, 9));
                const endTime = new Date(Number(stake.endTime) * 1000);
                const isActive = stake.active;

                return (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-lg p-3 bg-card">
                    <div className="flex-1">
                      <div className="font-semibold text-base md:text-lg">{amount.toLocaleString()} BIT</div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Pool: {pool.days} Days | APY: {pool.apy}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ends: {endTime.toLocaleString()}
                      </div>
                    </div>
                    {isActive ? (
                      <Button variant="outline" size="sm" onClick={() => handleUnstake(index)}>
                        Unstake
                      </Button>
                    ) : (
                      <Badge variant="secondary">Completed</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-6">No active stakes</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StakingTab;
