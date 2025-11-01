import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/config/contracts';
import { Shield, Plus, Trash2 } from 'lucide-react';
import { parseEther } from 'viem';

interface TaskInput {
  id: string;
  taskId: string;
  reward: string;
  activationDays: string;
  category: string;
}

export function TaskAdminPanel() {
  const { address } = useAccount();
  const { toast } = useToast();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const [tasks, setTasks] = useState<TaskInput[]>([
    { id: '1', taskId: '', reward: '', activationDays: '0', category: 'social' }
  ]);

  const categories = [
    { value: 'check-in', label: 'Daily Check-in' },
    { value: 'social', label: 'Social Media' },
    { value: 'events', label: 'Events' },
    { value: 'webinar', label: 'Webinars' },
    { value: 'forum', label: 'Forum' },
  ];

  const addTask = () => {
    setTasks([...tasks, {
      id: Date.now().toString(),
      taskId: '',
      reward: '',
      activationDays: '0',
      category: 'social'
    }]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id: string, field: keyof TaskInput, value: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleCreateTasks = async () => {
    if (!address) {
      toast({ title: "Error", description: "Please connect your wallet", variant: "destructive" });
      return;
    }

    const validTasks = tasks.filter(t => t.taskId && t.reward);
    if (validTasks.length === 0) {
      toast({ title: "Error", description: "Please add at least one valid task", variant: "destructive" });
      return;
    }

    try {
      const taskIds = validTasks.map(t => t.taskId);
      const rewards = validTasks.map(t => parseEther(t.reward));
      const currentTime = Math.floor(Date.now() / 1000);
      const activationDates = validTasks.map(t => 
        currentTime + (parseInt(t.activationDays) * 24 * 60 * 60)
      );
      const categories = validTasks.map(t => t.category);

      writeContract({
        address: CONTRACT_ADDRESSES.BIT_COMMUNITY_TASKS,
        abi: CONTRACT_ABIS.BITCommunityTasks as any,
        functionName: 'createTasksBatch',
        args: [taskIds, rewards, activationDates, categories] as any,
      } as any);

      toast({
        title: "Creating Tasks",
        description: "Transaction submitted. Waiting for confirmation...",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to create tasks",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Task Management (Admin Only)</CardTitle>
        </div>
        <CardDescription>
          Create and manage community tasks. Only contract owner can perform these actions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tasks.map((task, index) => (
          <div key={task.id} className="space-y-4 p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Task {index + 1}</h4>
              {tasks.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`taskId-${task.id}`}>Task ID</Label>
                <Input
                  id={`taskId-${task.id}`}
                  placeholder="e.g., twitter-follow"
                  value={task.taskId}
                  onChange={(e) => updateTask(task.id, 'taskId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`reward-${task.id}`}>Reward (BIT tokens)</Label>
                <Input
                  id={`reward-${task.id}`}
                  type="number"
                  placeholder="e.g., 250"
                  value={task.reward}
                  onChange={(e) => updateTask(task.id, 'reward', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`days-${task.id}`}>Activation Days (from now)</Label>
                <Input
                  id={`days-${task.id}`}
                  type="number"
                  placeholder="0 for immediate"
                  value={task.activationDays}
                  onChange={(e) => updateTask(task.id, 'activationDays', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`category-${task.id}`}>Category</Label>
                <Select
                  value={task.category}
                  onValueChange={(value) => updateTask(task.id, 'category', value)}
                >
                  <SelectTrigger id={`category-${task.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addTask}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Task
          </Button>

          <Button
            onClick={handleCreateTasks}
            disabled={isPending || isConfirming}
            className="flex-1"
          >
            {isPending || isConfirming ? "Creating..." : "Create Tasks"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
