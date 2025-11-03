import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink, Gift } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

// Format BIT tokens (9 decimals)
const formatBIT = (amount: bigint): string => {
  const decimals = 1e9;
  const formatted = Number(amount) / decimals;
  return formatted.toLocaleString('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  });
};

interface EventCardProps {
  eventId: number;
  title: string;
  description: string;
  eventLink: string;
  startTime: bigint;
  endTime: bigint;
  rewardPerAttendee: bigint;
  eventType: number; // 0 = Webinar, 1 = Presentation
  isActive: boolean;
  userStatus: {
    validated: boolean;
    claimed: boolean;
    guestCount: number;
    potentialReward: bigint;
  };
  onClaim: () => void;
  isPending: boolean;
}

const EventCard = ({
  eventId,
  title,
  description,
  eventLink,
  startTime,
  endTime,
  rewardPerAttendee,
  eventType,
  isActive,
  userStatus,
  onClaim,
  isPending,
}: EventCardProps) => {
  const now = Date.now();
  const startTimestamp = Number(startTime) * 1000;
  const endTimestamp = Number(endTime) * 1000;

  const timeLeft = useCountdown(startTimestamp);
  const [isLinkUnlocked, setIsLinkUnlocked] = useState(now >= startTimestamp);
  const [hasEnded, setHasEnded] = useState(now >= endTimestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setIsLinkUnlocked(currentTime >= startTimestamp);
      setHasEnded(currentTime >= endTimestamp);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp, endTimestamp]);

  const formatCountdown = () => {
    if (hasEnded) return 'Event Ended';
    if (isLinkUnlocked) return 'Event Live';
    
    const { days, hours, minutes, seconds } = timeLeft;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const eventTypeName = eventType === 0 ? 'Webinar' : 'Presentation';
  const eventTypeColor = eventType === 0 ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300';

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <Badge className={eventTypeColor}>{eventTypeName}</Badge>
        </div>
        {!isActive && <Badge variant="secondary">Inactive</Badge>}
      </div>

      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span>
            {new Date(startTimestamp).toLocaleDateString()} - {new Date(endTimestamp).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-semibold">{formatCountdown()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Gift className="w-4 h-4 text-primary" />
          <span>
            Reward: {formatBIT(rewardPerAttendee)} BIT
            {userStatus.guestCount > 0 && eventType === 0 && 
              ` + ${userStatus.guestCount * 350} BIT bonus`
            }
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={isLinkUnlocked ? 'default' : 'secondary'}
          disabled={!isLinkUnlocked}
          onClick={() => window.open(eventLink, '_blank')}
          className="flex-1"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {isLinkUnlocked ? 'Visit Event' : 'Locked'}
        </Button>

        {userStatus.validated && !userStatus.claimed && hasEnded && (
          <Button
            onClick={onClaim}
            disabled={isPending}
            variant="default"
            className="flex-1"
          >
            <Gift className="w-4 h-4 mr-2" />
            {isPending ? 'Claiming...' : `Claim ${formatBIT(userStatus.potentialReward)} BIT`}
          </Button>
        )}
      </div>

      {userStatus.claimed && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
          <span className="text-green-400 font-semibold">✓ Rewards Claimed!</span>
        </div>
      )}

      {!userStatus.validated && hasEnded && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
          <span className="text-yellow-400 text-sm">Attendance not validated</span>
        </div>
      )}
    </Card>
  );
};

export default EventCard;
