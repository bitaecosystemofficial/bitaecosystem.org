import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { toast } from '@/hooks/use-toast';
import { Calendar, Plus, Users } from 'lucide-react';
import { parseEther } from 'viem';

const AirdropAdminPanel = () => {
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventLink: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    reward: '',
    eventType: '0', // 0 = Webinar, 1 = Presentation
  });

  const [attendees, setAttendees] = useState({
    eventId: '',
    walletAddresses: '',
    guestCounts: '',
  });

  const ensureCorrectNetwork = async () => {
    try {
      await switchChain({ chainId: 56 }); // BSC Mainnet
      return true;
    } catch (error) {
      toast({
        title: "Network Switch Required",
        description: "Please switch to BSC Mainnet",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!(await ensureCorrectNetwork())) return;

    try {
      const startTimestamp = Math.floor(new Date(`${formData.startDate}T${formData.startTime}`).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(`${formData.endDate}T${formData.endTime}`).getTime() / 1000);
      // Convert to 9 decimals (1e9) instead of 18 decimals
      const rewardAmount = BigInt(Math.floor(parseFloat(formData.reward) * 1e9));

      writeContract({
        address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
        abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
        functionName: 'createEvent',
        args: [
          formData.title,
          formData.description,
          formData.eventLink,
          BigInt(startTimestamp),
          BigInt(endTimestamp),
          rewardAmount,
          parseInt(formData.eventType),
        ],
      } as any);

      toast({
        title: "Creating Event",
        description: "Transaction submitted...",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create event",
        variant: "destructive",
      });
    }
  };

  const handleBatchValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!(await ensureCorrectNetwork())) return;

    try {
      const wallets = attendees.walletAddresses.split(',').map(w => w.trim() as `0x${string}`);
      const counts = attendees.guestCounts.split(',').map(c => parseInt(c.trim()));

      if (wallets.length !== counts.length) {
        toast({
          title: "Error",
          description: "Number of wallet addresses must match number of guest counts",
          variant: "destructive",
        });
        return;
      }

      // Validate attendees one by one since batchValidateAttendees doesn't exist
      for (let i = 0; i < wallets.length; i++) {
        writeContract({
          address: CONTRACT_ADDRESSES.CLAIM_AIRDROP,
          abi: CONTRACT_ABIS.CLAIM_AIRDROP as any,
          functionName: 'validateAttendee',
          args: [BigInt(attendees.eventId), wallets[i], counts[i]],
        } as any);
        
        // Small delay between transactions
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      toast({
        title: "Validating Attendees",
        description: "Transactions submitted...",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to validate attendees",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Event Form */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Create New Event</h3>
        </div>

        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Weekly Webinar #1"
                required
              />
            </div>

            <div>
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={formData.eventType} onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Webinar (200 BIT)</SelectItem>
                  <SelectItem value="1">Presentation (1000 BIT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Event description..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="eventLink">Event Link (Zoom/Website)</Label>
            <Input
              id="eventLink"
              type="url"
              value={formData.eventLink}
              onChange={(e) => setFormData({ ...formData, eventLink: e.target.value })}
              placeholder="https://zoom.us/j/..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reward">Reward per Attendee (BIT)</Label>
            <Input
              id="reward"
              type="number"
              step="0.01"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              placeholder="200"
              required
            />
          </div>

          <Button type="submit" disabled={isPending || isConfirming} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {isPending || isConfirming ? 'Creating...' : 'Create Event'}
          </Button>
        </form>
      </Card>

      {/* Batch Validate Attendees */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Validate Attendees</h3>
        </div>

        <form onSubmit={handleBatchValidate} className="space-y-4">
          <div>
            <Label htmlFor="eventId">Event ID</Label>
            <Input
              id="eventId"
              type="number"
              value={attendees.eventId}
              onChange={(e) => setAttendees({ ...attendees, eventId: e.target.value })}
              placeholder="0"
              required
            />
          </div>

          <div>
            <Label htmlFor="walletAddresses">Wallet Addresses (comma-separated)</Label>
            <Textarea
              id="walletAddresses"
              value={attendees.walletAddresses}
              onChange={(e) => setAttendees({ ...attendees, walletAddresses: e.target.value })}
              placeholder="0x123..., 0x456..., 0x789..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="guestCounts">Guest Counts (comma-separated, 0 if no guests)</Label>
            <Input
              id="guestCounts"
              value={attendees.guestCounts}
              onChange={(e) => setAttendees({ ...attendees, guestCounts: e.target.value })}
              placeholder="0, 2, 1"
              required
            />
          </div>

          <Button type="submit" disabled={isPending || isConfirming} className="w-full">
            <Users className="w-4 h-4 mr-2" />
            {isPending || isConfirming ? 'Validating...' : 'Validate Attendees'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AirdropAdminPanel;
