import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { SUPPORTED_CHAINS } from '@/config/contracts';
import { formatEther } from 'viem';
import { Calendar, Gift, Users, Video, Award, ExternalLink, CheckCircle2, Clock } from 'lucide-react';

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

  // Daily Check-in Status
  const { data: dailyStatus, refetch: refetchDaily } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'getDailyCheckInStatus',
    args: [address],
    query: { enabled: !!address },
  });

  // Social Tasks Status
  const { data: socialStatus, refetch: refetchSocial } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'getSocialTaskStatus',
    args: [address],
    query: { enabled: !!address },
  });

  // Webinar Reward Status
  const { data: webinarStatus, refetch: refetchWebinar } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'getWebinarRewardStatus',
    args: [address],
    query: { enabled: !!address },
  });

  // Event Reward Status
  const { data: eventStatus, refetch: refetchEvent } = useReadContract({
    address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
    abi: CONTRACT_ABIS.CLAIM_AIRDROP,
    functionName: 'getEventRewardStatus',
    args: [address],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (isSuccess) {
      refetchDaily();
      refetchSocial();
      refetchWebinar();
      refetchEvent();
      setRefreshKey(prev => prev + 1);
    }
  }, [isSuccess, refetchDaily, refetchSocial, refetchWebinar, refetchEvent]);

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

  const handleClaimWebinarReward = async () => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'claimWebinarReward',
    } as any);
  };

  const handleClaimEventReward = async () => {
    if (!(await ensureCorrectNetwork())) return;
    writeContract({
      address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
      abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
      functionName: 'claimEventReward',
    } as any);
  };

  const dailyData = dailyStatus as [bigint, bigint, bigint, boolean, boolean, bigint] | undefined;
  const socialData = socialStatus as [number, boolean, boolean[]] | undefined;
  const webinarData = webinarStatus as [bigint, bigint, bigint, boolean, boolean, number] | undefined;
  const eventData = eventStatus as [bigint, bigint, bigint, boolean, boolean, number] | undefined;

  const totalDays = dailyData ? Number(dailyData[0]) : 0;
  const canCheckIn = dailyData ? dailyData[4] : false;
  const dailyClaimed = dailyData ? dailyData[3] : false;
  const dailyProgress = (totalDays / 45) * 100;

  const socialCompletedCount = socialData ? socialData[0] : 0;
  const socialClaimed = socialData ? socialData[1] : false;
  const tasksCompleted = socialData ? socialData[2] : Array(8).fill(false);
  const socialProgress = (socialCompletedCount / 8) * 100;

  const webinarApproved = webinarData ? webinarData[3] : false;
  const webinarClaimed = webinarData ? webinarData[4] : false;
  const webinarTotalReward = webinarData ? formatEther(webinarData[2]) : '0';

  const eventApproved = eventData ? eventData[3] : false;
  const eventClaimed = eventData ? eventData[4] : false;
  const eventTotalReward = eventData ? formatEther(eventData[2]) : '0';

  return (
    <div key={refreshKey} className="space-y-6">
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
            {SOCIAL_TASKS.map((task) => {
              const isCompleted = tasksCompleted[task.id];
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className="text-sm font-medium text-foreground">{task.name}</span>
                  </div>
                  {!isCompleted && (
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
                  )}
                </div>
              );
            })}
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

      {/* Webinar Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Zoom Webinar Reward
          </CardTitle>
          <CardDescription>
            Earn 150 BIT for attending + 350 BIT bonus per guest you invite
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!webinarApproved && (
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                Admin approval pending. Attend the webinar and wait for verification.
              </p>
            </div>
          )}

          {webinarApproved && !webinarClaimed && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-lg font-semibold text-primary">
                  Total Reward: {webinarTotalReward} BIT
                </p>
              </div>
              <Button
                onClick={handleClaimWebinarReward}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim Webinar Reward
              </Button>
            </div>
          )}

          {webinarClaimed && (
            <div className="flex items-center justify-center gap-2 text-primary p-4 bg-primary/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Webinar Reward Claimed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Section */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Event / Presentation Reward
          </CardTitle>
          <CardDescription>
            Earn 150 BIT for attending + 350 BIT bonus per guest you invite
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!eventApproved && (
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                Admin approval pending. Attend the event and wait for verification.
              </p>
            </div>
          )}

          {eventApproved && !eventClaimed && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-lg font-semibold text-primary">
                  Total Reward: {eventTotalReward} BIT
                </p>
              </div>
              <Button
                onClick={handleClaimEventReward}
                disabled={isPending}
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim Event Reward
              </Button>
            </div>
          )}

          {eventClaimed && (
            <div className="flex items-center justify-center gap-2 text-primary p-4 bg-primary/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Event Reward Claimed!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
