import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Calendar, 
  Share2, 
  PartyPopper, 
  Video, 
  MessageSquare,
  Check,
  Clock,
  Trophy,
  Coins,
  Facebook,
  Twitter,
  Youtube,
  Users,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBITBalance } from '@/contexts/BITBalanceContext';
import { useCountdown } from '@/hooks/useCountdown';
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS, SUPPORTED_CHAINS } from '@/config/contracts';
import bitLogo from '@/assets/bit-token-logo.png';
import { TaskAdminPanel } from './TaskAdminPanel';
import { formatEther, encodeAbiParameters, parseAbiParameters, toHex, pad } from 'viem';
import { createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';

// Helper: Convert string to bytes32
const stringToBytes32 = (str: string): `0x${string}` => {
  return pad(toHex(str), { size: 32 }) as `0x${string}`;
};

// Helper: Convert category string to uint8
const categoryToUint8 = (category: string): number => {
  const categoryMap: Record<string, number> = {
    'check-in': 0,
    'social': 1,
    'events': 2,
    'webinar': 3,
    'forum': 4,
  };
  return categoryMap[category] || 0;
};

// Helper: Convert uint8 to category string
const uint8ToCategory = (categoryNum: number): string => {
  const categories = ['check-in', 'social', 'events', 'webinar', 'forum'];
  return categories[categoryNum] || 'social';
};

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  category: 'check-in' | 'social' | 'events' | 'webinar' | 'forum';
  icon: any;
  color: string;
  link?: string;
  requiresInvites?: boolean;
  inviteReward?: number;
  inviteCount?: string;
  activationDate?: number; // Timestamp for when link becomes active
  linkVisited?: boolean; // Track if link was visited
  unlockTime?: number; // Timestamp when task unlocks (for check-ins)
}

const CommunityTab = () => {
  const { toast } = useToast();
  const { addBalance, formatBalance } = useBITBalance();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract } = useWriteContract();
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [checkInStreak, setCheckInStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Check if on BSC network
  const isBSCNetwork = chainId === SUPPORTED_CHAINS.BSC_MAINNET || chainId === SUPPORTED_CHAINS.BSC_TESTNET;

  // Read contract owner
  const { data: contractOwner } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
    abi: CONTRACT_ABIS.BITCommunityTasks as any,
    functionName: 'owner',
  });

  // Hardcoded task IDs (no dynamic array in gas-optimized contract)
  const [allTaskIds, setAllTaskIds] = useState<string[]>([
    // Check-in tasks (Day 1-30)
    ...Array.from({ length: 30 }, (_, i) => `day-${i + 1}`),
    // Social tasks
    'follow-facebook', 'follow-twitter', 'subscribe-youtube', 'join-telegram',
    // Events tasks
    'event-1', 'event-2',
    // Webinar tasks
    'webinar-1', 'webinar-2',
    // Forum tasks
    'forum-1', 'forum-2',
  ]);

  // Fetch user stats from blockchain
  const { data: userStats } = useReadContract({
    address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
    abi: CONTRACT_ABIS.BITCommunityTasks as any,
    functionName: 'getUserStats',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isBSCNetwork,
    },
  });

  // Update local state from blockchain data (uint16 values)
  useEffect(() => {
    if (userStats && Array.isArray(userStats)) {
      setCheckInStreak(Number(userStats[1])); // checkInStreak is second return value
    }
  }, [userStats]);

  // Check if current user is owner
  const isOwner = address && contractOwner && address.toLowerCase() === (contractOwner as string).toLowerCase();

  // Helper function to read contract
  const publicClient = createPublicClient({
    chain: bsc,
    transport: http(),
  });

  // Fetch and build tasks from blockchain
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!allTaskIds || allTaskIds.length === 0) {
        setLoading(false);
        return;
      }

      const taskPromises = allTaskIds.map(async (taskId) => {
        try {
          const taskIdBytes32 = stringToBytes32(taskId);
          
          const taskInfo: any = await publicClient.readContract({
            address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
            abi: CONTRACT_ABIS.BITCommunityTasks as any,
            functionName: 'getTaskInfo',
            args: [taskIdBytes32] as any,
          } as any);

          const userTaskInfo: any = address ? await publicClient.readContract({
            address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
            abi: CONTRACT_ABIS.BITCommunityTasks as any,
            functionName: 'getUserTaskInfo',
            args: [address, taskIdBytes32] as any,
          } as any) : [false, 0n, false, 0n];

          const categoryIcons: Record<string, any> = {
            'check-in': Calendar,
            'social': Users,
            'events': PartyPopper,
            'webinar': Video,
            'forum': MessageSquare,
          };

          const categoryColors: Record<string, string> = {
            'check-in': 'from-blue-500/20 to-blue-500/5',
            'social': 'from-cyan-500/20 to-cyan-500/5',
            'events': 'from-purple-500/20 to-purple-500/5',
            'webinar': 'from-green-500/20 to-green-500/5',
            'forum': 'from-orange-500/20 to-orange-500/5',
          };

          // taskInfo: [reward(uint88), activationDate(uint80), category(uint8), isActive(bool)]
          const reward = taskInfo[0];
          const activationDate = taskInfo[1];
          const categoryNum = taskInfo[2];
          const isActive = taskInfo[3];
          
          // userTaskInfo: [completed(bool), completedAt(uint80), linkVisited(bool), unlockTime(uint80)]
          const completed = userTaskInfo[0];
          const completedAt = userTaskInfo[1];
          const linkVisited = userTaskInfo[2];
          const unlockTime = userTaskInfo[3];
          
          const taskCategory = uint8ToCategory(categoryNum);
          const activationTimestamp = Number(activationDate);
          const unlockTimestamp = Number(unlockTime);
          
          return {
            id: taskId,
            title: taskId.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            description: `Complete this ${taskCategory} task to earn BIT tokens`,
            reward: parseFloat(formatEther(reward)),
            category: taskCategory as any,
            icon: categoryIcons[taskCategory] || Users,
            color: categoryColors[taskCategory] || 'from-gray-500/20 to-gray-500/5',
            completed,
            linkVisited,
            activationDate: activationTimestamp > 0 ? activationTimestamp * 1000 : undefined,
            unlockTime: unlockTimestamp > 0 ? unlockTimestamp * 1000 : undefined,
          };
        } catch (error) {
          console.error(`Error fetching task ${taskId}:`, error);
          return null;
        }
      });

      const fetchedTasks = (await Promise.all(taskPromises)).filter(Boolean) as Task[];
      setTasks(fetchedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, [allTaskIds, address]);

  const handleTaskAction = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // For check-in tasks, check unlock time
    if (task.category === 'check-in' && task.unlockTime && Date.now() < task.unlockTime) {
      toast({
        title: 'Task Not Unlocked Yet',
        description: 'Complete the previous day first.',
        variant: 'destructive',
      });
      return;
    }

    // For other tasks, check activation date
    if (task.category !== 'check-in' && task.activationDate && Date.now() < task.activationDate) {
      toast({
        title: 'Link Not Active Yet',
        description: 'This link will be available soon. Please check the timer.',
        variant: 'destructive',
      });
      return;
    }

    // Check if on BSC network
    if (!isBSCNetwork) {
      try {
        await switchChain({ chainId: SUPPORTED_CHAINS.BSC_MAINNET });
      } catch (error) {
        toast({
          title: 'Network Switch Required',
          description: 'Please switch to BSC network to complete tasks',
          variant: 'destructive',
        });
        return;
      }
    }

    // If task has a link, mark as visited on blockchain first
    if (task.link) {
      try {
        await writeContract({
          address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
          abi: CONTRACT_ABIS.BITCommunityTasks as any,
          functionName: 'markLinkVisited',
          args: [stringToBytes32(taskId)] as any,
        } as any);

        // Open link in new tab
        window.open(task.link, '_blank');
        
        // Mark link as visited locally
        setTasks(tasks.map(t => 
          t.id === taskId ? { ...t, linkVisited: true } : t
        ));

        toast({
          title: 'Link Visited',
          description: 'Your visit has been recorded on the blockchain',
        });

        // Auto-complete after visiting the link
        setTimeout(() => {
          completeTask(taskId);
        }, 2000);
      } catch (error) {
        toast({
          title: 'Transaction Failed',
          description: 'Failed to record link visit on blockchain',
          variant: 'destructive',
        });
      }
      
      return;
    }

    // Complete the task immediately if no link required
    completeTask(taskId);
  };

  const completeTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // Check if on BSC network
    if (!isBSCNetwork) {
      try {
        await switchChain({ chainId: SUPPORTED_CHAINS.BSC_MAINNET });
      } catch (error) {
        toast({
          title: 'Network Switch Required',
          description: 'Please switch to BSC network to complete tasks',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      // Complete task on blockchain using bytes32
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
        abi: CONTRACT_ABIS.BITCommunityTasks as any,
        functionName: 'completeTask',
        args: [stringToBytes32(taskId)] as any,
      } as any);

      // Update local state
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      if (task.category === 'check-in') {
        const newStreak = checkInStreak + 1;
        setCheckInStreak(newStreak);
        
        if (newStreak === 30) {
          toast({
            title: '🎉 30-Day Streak Complete!',
            description: 'Congratulations! You completed the 30-day check-in challenge!',
          });
        }
      }

      setTotalPoints(prev => prev + task.reward);
      addBalance(task.reward);

      toast({
        title: 'Task Completed! 🎉',
        description: `You earned ${task.reward} BIT tokens! Recorded on blockchain.`,
      });
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'Failed to complete task on blockchain',
        variant: 'destructive',
      });
    }
  };

  const categories = [
    { 
      id: 'check-in', 
      name: 'Daily Check-In (30 Days)', 
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      description: 'Once per unique wallet address'
    },
    { 
      id: 'social', 
      name: 'Social Tasks', 
      icon: Share2,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      description: 'Once per unique wallet and account'
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: PartyPopper,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      description: 'Earn BIT by attending events'
    },
    { 
      id: 'webinar', 
      name: 'Webinars', 
      icon: Video,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 border-green-500/30',
      description: 'Daily Zoom sessions with bonus rewards'
    },
    { 
      id: 'forum', 
      name: 'Forum Activity', 
      icon: MessageSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
      description: 'Daily forums and discussions'
    },
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const handleClaimCategoryRewards = async (category: string) => {
    if (!isBSCNetwork) {
      try {
        await switchChain({ chainId: SUPPORTED_CHAINS.BSC_MAINNET });
      } catch (error) {
        toast({
          title: 'Network Switch Required',
          description: 'Please switch to BSC network to claim rewards',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      // Convert category string to uint8
      const categoryNum = categoryToUint8(category);
      
      await writeContract({
        address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
        abi: CONTRACT_ABIS.BITCommunityTasks as any,
        functionName: 'claimCategoryRewards',
        args: [categoryNum] as any,
      } as any);

      toast({
        title: 'Rewards Claimed! 🎉',
        description: `Your ${category} rewards have been sent to your wallet!`,
      });

      // Force task refresh
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Claim Failed',
        description: 'Failed to claim rewards from smart contract',
        variant: 'destructive',
      });
    }
  };

  // TaskCard component to handle individual tasks without hook violations
  const TaskCard = ({ task, TaskIcon, isLinkActive, onTaskAction }: {
    task: Task;
    TaskIcon: any;
    isLinkActive: boolean;
    onTaskAction: (taskId: string) => void;
  }) => {
    // For check-in tasks, use unlock time; for others, use activation date
    const countdownTime = task.category === 'check-in' && task.unlockTime 
      ? task.unlockTime 
      : task.activationDate || 0;
    const timeLeft = countdownTime > 0 ? useCountdown(countdownTime) : null;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-gradient-to-r ${task.color} border border-border/50 rounded-xl p-4 flex flex-col`}
      >
        {/* Task Content */}
        <div className="flex items-start gap-3 flex-1 mb-4">
          <div className="mt-1">
            <TaskIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base mb-1">{task.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">+{task.reward} BIT</span>
              </div>
              {task.requiresInvites && (
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {task.inviteCount} invites needed
                </Badge>
              )}
              {!isLinkActive && timeLeft && (
                <Badge variant="outline" className="text-xs bg-orange-500/10">
                  <Clock className="w-3 h-3 mr-1" />
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </Badge>
              )}
              {task.linkVisited && !task.completed && (
                <Badge variant="outline" className="text-xs bg-blue-500/10">
                  <Check className="w-3 h-3 mr-1" />
                  Link Visited
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          {task.completed ? (
            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
              <Check className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <Button
              onClick={() => onTaskAction(task.id)}
              disabled={!isLinkActive}
              size="sm"
              className="min-w-[100px]"
            >
              {task.link ? (
                <>
                  Visit Link <ExternalLink className="w-3 h-3 ml-1" />
                </>
              ) : (
                'Complete'
              )}
            </Button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Admin Panel - Only show to contract owner */}
      {isOwner && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="mb-4"
          >
            {showAdminPanel ? 'Hide' : 'Show'} Admin Panel
          </Button>
          {showAdminPanel && <TaskAdminPanel />}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Loading tasks from blockchain...</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                <div className="flex items-center gap-2">
                  <img src={bitLogo} alt="BIT Token" className="w-8 h-8" />
                  <p className="text-3xl font-bold text-primary">{formatBalance(totalPoints)}</p>
                </div>
              </div>
              <Trophy className="w-12 h-12 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Check-In Streak</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{checkInStreak}/30</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {completedTasks}/{tasks.length}
                </p>
                <Progress value={progressPercentage} className="mt-2 h-2" />
              </div>
              <Check className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Categories */}
      {categories.map((category) => {
        const categoryTasks = tasks.filter(t => t.category === category.id);
        const CategoryIcon = category.icon;
        const allCategoryTasksCompleted = categoryTasks.length > 0 && categoryTasks.every(t => t.completed);

        return (
          <Card key={category.id} className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {category.description} • {categoryTasks.filter(t => t.completed).length} of {categoryTasks.length} completed
                  </CardDescription>
                </div>
                {allCategoryTasksCompleted && address && (
                  <Button
                    onClick={() => handleClaimCategoryRewards(category.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Claim Rewards
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {category.id === 'check-in' && isMobile ? (
                // Mobile: Swipeable horizontal scroll for check-in
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {categoryTasks.map((task) => {
                    const TaskIcon = task.icon;
                    // For check-in, check unlock time; for others, activation date
                    const isLinkActive = task.category === 'check-in' 
                      ? (!task.unlockTime || Date.now() >= task.unlockTime)
                      : (!task.activationDate || Date.now() >= task.activationDate);
                    
                    return (
                      <div key={task.id} className="flex-shrink-0 w-[85vw] snap-center">
                        <TaskCard 
                          task={task}
                          TaskIcon={TaskIcon}
                          isLinkActive={isLinkActive}
                          onTaskAction={handleTaskAction}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : category.id === 'check-in' ? (
                // Desktop: 5 containers per row for check-in
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4">
                  {categoryTasks.map((task) => {
                    const TaskIcon = task.icon;
                    // For check-in, check unlock time; for others, activation date
                    const isLinkActive = task.category === 'check-in' 
                      ? (!task.unlockTime || Date.now() >= task.unlockTime)
                      : (!task.activationDate || Date.now() >= task.activationDate);
                    
                    return (
                      <TaskCard 
                        key={task.id}
                        task={task}
                        TaskIcon={TaskIcon}
                        isLinkActive={isLinkActive}
                        onTaskAction={handleTaskAction}
                      />
                    );
                  })}
                </div>
              ) : (
                // Other categories: vertical list
                <div className="space-y-4">
                  {categoryTasks.map((task) => {
                    const TaskIcon = task.icon;
                    // For other categories, use activation date
                    const isLinkActive = !task.activationDate || Date.now() >= task.activationDate;
                    
                    return (
                      <TaskCard 
                        key={task.id}
                        task={task}
                        TaskIcon={TaskIcon}
                        isLinkActive={isLinkActive}
                        onTaskAction={handleTaskAction}
                      />
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Info Banner */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Earn More BIT Tokens!</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete community tasks to earn BIT tokens and build your reputation. 
                Daily check-ins help you maintain your streak for bonus rewards. 
                Engage with our community through social media, forums, events, and educational webinars 
                to maximize your earnings and stay informed about the latest updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityTab;
