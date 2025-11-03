import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ShoppingBag, TrendingUp, Users, LogOut, Store, Wallet, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import BuyBitTab from '@/components/dashboard/BuyBitTab';
import StakingTab from '@/components/dashboard/StakingTab';
import CommunityTab from '@/components/dashboard/CommunityTab';
import ClaimAirdropTab from '@/components/dashboard/ClaimAirdropTab';
import { ExchangeShopTab } from '@/components/dashboard/ExchangeShopTab';
import PWAInstallPrompt from '@/components/dashboard/PWAInstallPrompt';
import { BalanceModal } from '@/components/dashboard/BalanceModal';

const Dashboard = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  const menuItems = [
    { value: 'buy', label: 'Buy BIT Token', icon: ShoppingBag },
    { value: 'staking', label: 'Staking', icon: TrendingUp },
    { value: 'community', label: 'Community', icon: Users },
    { value: 'airdrop', label: 'Claim Airdrop', icon: Gift },
    { value: 'exchange', label: 'Exchange Shop', icon: Store },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <PWAInstallPrompt />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-5 mb-8 bg-card/50 backdrop-blur-sm border border-border/50 p-1 h-auto">
            {menuItems.map((item) => (
              <TabsTrigger 
                key={item.value} 
                value={item.value} 
                className="font-semibold py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="buy" className="mt-0">
            <BuyBitTab />
          </TabsContent>

          <TabsContent value="staking" className="mt-0">
            <StakingTab />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <CommunityTab />
          </TabsContent>

          <TabsContent value="airdrop" className="mt-0">
            <ClaimAirdropTab />
          </TabsContent>

          <TabsContent value="exchange" className="mt-0">
            <ExchangeShopTab />
          </TabsContent>
        </Tabs>

        {/* Mobile Floating Bottom Navigation */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-2xl z-50"
        >
          <div className="grid grid-cols-6 gap-1 p-2">
            <Button
              variant={activeTab === 'buy' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('buy')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'buy' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] font-medium">Buy BIT</span>
            </Button>
            
            <Button
              variant={activeTab === 'staking' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('staking')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'staking' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-[10px] font-medium">Staking</span>
            </Button>
            
            <Button
              variant={activeTab === 'community' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('community')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'community' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-medium">Community</span>
            </Button>
            
            <Button
              variant={activeTab === 'airdrop' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('airdrop')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'airdrop' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span className="text-[10px] font-medium">Airdrop</span>
            </Button>
            
            <Button
              variant={activeTab === 'exchange' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('exchange')}
              className={`flex flex-col items-center justify-center h-16 gap-1 transition-all ${
                activeTab === 'exchange' 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <Store className="w-5 h-5" />
              <span className="text-[10px] font-medium">Exchange</span>
            </Button>

            {/* Mobile Wallet Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-16 gap-1 hover:bg-secondary/50"
                  onClick={() => setShowBalanceModal(true)}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Wallet</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto rounded-t-3xl">
                <div className="py-6 space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Wallet Options</h3>
                  <div className="space-y-3">
                    {address && (
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Connected Address</p>
                        <p className="text-sm font-mono">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={() => setShowBalanceModal(true)}
                      variant="outline"
                      className="w-full h-12 text-base mb-2"
                    >
                      <Wallet className="w-5 h-5 mr-2" />
                      View Balances
                    </Button>
                    <Button
                      onClick={() => disconnect()}
                      variant="destructive"
                      className="w-full h-12 text-base"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        {/* Add padding at bottom on mobile to account for floating nav */}
        <div className="md:hidden h-20"></div>
      </div>
      
      <BalanceModal open={showBalanceModal} onOpenChange={setShowBalanceModal} />
    </div>
  );
};

export default Dashboard;
