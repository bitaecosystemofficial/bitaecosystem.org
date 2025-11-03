import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { SUPPORTED_CHAINS } from '@/config/contracts';
import { formatEther } from 'viem';
import { Calendar, Gift, Users, Award, ExternalLink, CheckCircle2, Clock, Settings } from 'lucide-react';
import AirdropAdminPanel from './AirdropAdminPanel';
import EventCard from './EventCard';

const SOCIAL_TASKS = [
  { id: 0, name: 'Follow on Twitter', url: 'https://twitter.com/bitaccess' },
  { id: 1, name: 'Join Telegram', url: 'https://t.me/bitaccess' },
  { id: 2, name: 'Follow on Facebook', url: 'https://facebook.com/bitaccess' },
  { id: 3, name: 'Follow on Instagram', url: 'https://instagram.com/bitaccess' },
  { id: 4, name: 'Join Discord', url: 'https://discord.gg/bitaccess' },
  { id: 5, name: 'Subscribe on YouTube', url: 'https://youtube.com/bitaccess' },
  { id: 6, name: 'Follow on LinkedIn', url: 'https://linkedin.com/company/bitaccess' },
  { id: 7, name: 'Join Reddit Community', url: 'https://reddit.com/r/bitaccess' },
];

export default function ClaimAirdropTab() {
  const { address, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });
  const [refreshKey, setRefreshKey] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if user is contract owner
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'owner',
  });
  const isOwner = address && owner ? address.toLowerCase() === (owner as string).toLowerCase() : false;

  // Get event counter
  const { data: eventCounter, refetch: refetchEvents } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'eventCounter',
    query: { enabled: true },
  });

  // Daily Check-in Status
  const { data: dailyStatus, refetch: refetchDaily } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'dailyCheckIns',
    args: [address],
    query: { enabled: !!address },
  });

  // Social Tasks Status
  const { data: socialStatus, refetch: refetchSocial } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'socialTasks',
    args: [address],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (isSuccess) {
      refetchDaily();
      refetchSocial();
      refetchEvents();
      setRefreshKey(prev => prev + 1);
    }
  }, [isSuccess, refetchDaily, refetchSocial, refetchEvents]);

  const ensureCorrectNetwork = async () => {
    if (chainId !== SUPPORTED_CHAINS.BSC_MAINNET) {
      try {
        await switchChain({ chainId: SUPPORTED_CHAINS.BSC_MAINNET });
        return true;
      } catch (error) {
        toast({
          title: 'Network Switch Required',
          description: 'Please switch to BSC network',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  const handleCheckIn = async () => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'checkIn',
    } as any);
  };

  const handleClaimDailyRewards = async () => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'claimDailyRewards',
    } as any);
  };

  const handleCompleteSocialTask = async (taskId: number) => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'completeSocialTask',
      args: [taskId],
    } as any);
  };

  const handleClaimSocialRewards = async () => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'claimSocialRewards',
    } as any);
  };

  const handleClaimEventReward = async (eventId: number) => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'claimEventReward',
      args: [BigInt(eventId)],
    } as any);
  };

  const dailyData = dailyStatus as [bigint, bigint, bigint, boolean] | undefined;
  const socialData = socialStatus as [number, boolean] | undefined;

  const totalDays = dailyData ? Number(dailyData[1]) : 0;
  const firstCheckInTimestamp = dailyData ? Number(dailyData[2]) : 0;
  const dailyClaimed = dailyData ? dailyData[3] : false;
  const dailyProgress = (totalDays / 45) * 100;

  // Calculate if user can check in today
  const canCheckIn = firstCheckInTimestamp > 0 && totalDays < 45 && !dailyClaimed
    ? Math.floor((Date.now() / 1000 - firstCheckInTimestamp) / 86400) >= totalDays
    : firstCheckInTimestamp === 0;

  const socialCompletedCount = socialData ? socialData[0] : 0;
  const socialClaimed = socialData ? socialData[1] : false;
  const socialProgress = (socialCompletedCount / 8) * 100;

  // Generate event IDs from counter
  const eventIds = eventCounter ? Array.from({ length: Number(eventCounter) }, (_, i) => BigInt(i)) : [];

  if (showAdmin && isOwner) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <Button variant="outline" onClick={() => setShowAdmin(false)}>
            Back to Rewards
          </Button>
        </div>
        <AirdropAdminPanel />
      </div>
    );
  }

  return (
    <div key={refreshKey} className="space-y-6">
      {isOwner && (
        <Button onClick={() => setShowAdmin(true)} variant="outline" className="mb-4">
          <Settings className="w-4 h-4 mr-2" />
          Admin Panel
        </Button>
      )}
      {/* Daily Check-in Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Daily Check-in (45 Days)
          </CardTitle>
          <CardDescription>
            Check in daily for 45 days to earn 6,750 BIT tokens (150 BIT per day)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">{totalDays}/45 Days</span>
            </div>
            <Progress value={dailyProgress} className="h-3" />
          </div>

          {!dailyClaimed && totalDays < 45 && (
            <Button
              onClick={handleCheckIn}
              disabled={!canCheckIn || isPending}
              className="w-full"
            >
              {canCheckIn ? (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Check In Today
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Come Back Tomorrow
                </>
              )}
            </Button>
          )}

          {totalDays === 45 && !dailyClaimed && (
            <Button
              onClick={handleClaimDailyRewards}
              disabled={isPending}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              <Gift className="w-4 h-4 mr-2" />
              Claim 6,750 BIT Rewards
            </Button>
          )}

          {dailyClaimed && (
            <div className="flex items-center justify-center gap-2 text-primary p-4 bg-primary/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Daily Rewards Claimed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Tasks Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Social Media Tasks
          </CardTitle>
          <CardDescription>
            Complete all 8 social tasks to earn 500 BIT tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">{socialCompletedCount}/8 Tasks</span>
            </div>
            <Progress value={socialProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOCIAL_TASKS.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50"
              >
                <span className="text-sm font-medium text-foreground">{task.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(task.url, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleCompleteSocialTask(task.id)}
                    disabled={isPending}
                  >
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {socialCompletedCount === 8 && !socialClaimed && (
            <Button
              onClick={handleClaimSocialRewards}
              disabled={isPending}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              <Gift className="w-4 h-4 mr-2" />
              Claim 500 BIT Rewards
            </Button>
          )}

          {socialClaimed && (
            <div className="flex items-center justify-center gap-2 text-primary p-4 bg-primary/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Social Rewards Claimed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Active Events & Webinars
          </CardTitle>
          <CardDescription>
            Attend events to earn BIT rewards. Countdown timers show when events start.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {eventIds.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No active events at this time. Check back later!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {eventIds.map((eventId) => (
                <EventCardWrapper
                  key={Number(eventId)}
                  eventId={Number(eventId)}
                  userAddress={address}
                  onClaim={() => handleClaimEventReward(Number(eventId))}
                  isPending={isPending}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Wrapper component to fetch individual event data
function EventCardWrapper({
  eventId,
  userAddress,
  onClaim,
  isPending,
}: {
  eventId: number;
  userAddress: `0x${string}` | undefined;
  onClaim: () => void;
  isPending: boolean;
}) {
  const { data: eventData } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'events',
    args: [BigInt(eventId)],
  });

  const { data: isValidated } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'eventAttendance',
    args: [BigInt(eventId), userAddress],
    query: { enabled: !!userAddress },
  });

  const { data: hasClaimed } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'eventRewardClaimed',
    args: [BigInt(eventId), userAddress],
    query: { enabled: !!userAddress },
  });

  const { data: guestCount } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'eventReferrals',
    args: [BigInt(eventId), userAddress],
    query: { enabled: !!userAddress },
  });

  if (!eventData) return null;

  const [title, description, eventLink, startTime, endTime, rewardPerAttendee, eventType, isActive] =
    eventData as [string, string, string, bigint, bigint, bigint, number, boolean];

  // Calculate potential reward (9 decimals)
  const DECIMALS = BigInt(1e9);
  let potentialReward = rewardPerAttendee;
  
  // Type cast for guest count
  const guests = (guestCount as number) || 0;
  
  // If webinar (eventType === 0) and has guests, add bonus
  if (eventType === 0 && guests > 0) {
    const bonusPerGuest = BigInt(350) * DECIMALS;
    potentialReward += bonusPerGuest * BigInt(guests);
  }

  const validated = (isValidated as boolean) || false;
  const claimed = (hasClaimed as boolean) || false;

  return (
    <EventCard
      eventId={eventId}
      title={title}
      description={description}
      eventLink={eventLink}
      startTime={startTime}
      endTime={endTime}
      rewardPerAttendee={rewardPerAttendee}
      eventType={eventType}
      isActive={isActive}
      userStatus={{
        validated,
        claimed,
        guestCount: guests,
        potentialReward,
      }}
      onClaim={onClaim}
      isPending={isPending}
    />
  );
}
