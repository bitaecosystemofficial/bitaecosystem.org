import { motion } from "framer-motion";
import { ShoppingCart, Coins, Users, Store, ArrowRight, Wallet, Gift, TrendingUp, Lock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowItWorks = () => {
  const buyBitSteps = [
    {
      icon: Wallet,
      title: "Connect Wallet",
      description: "Connect your MetaMask, Trust Wallet, or any Web3 wallet to the platform"
    },
    {
      icon: Coins,
      title: "Choose Payment",
      description: "Select USDT, USDC, or BNB to purchase BIT tokens"
    },
    {
      icon: ArrowRight,
      title: "Swap Tokens",
      description: "Enter the amount and confirm the transaction on your wallet"
    },
    {
      icon: Gift,
      title: "Receive BIT",
      description: "BIT tokens are instantly sent to your wallet address"
    }
  ];

  const stakingSteps = [
    {
      icon: Wallet,
      title: "Hold BIT Tokens",
      description: "Ensure you have BIT tokens in your connected wallet"
    },
    {
      icon: Lock,
      title: "Select Staking Period",
      description: "Choose 30, 90, 180, or 365 days staking period"
    },
    {
      icon: TrendingUp,
      title: "Earn Rewards",
      description: "Earn up to 15% APY based on your staking duration"
    },
    {
      icon: Gift,
      title: "Claim Anytime",
      description: "Withdraw your rewards or unstake after lock period"
    }
  ];

  const communitySteps = [
    {
      icon: Users,
      title: "Join Community",
      description: "Follow us on social media and join our Telegram group"
    },
    {
      icon: Target,
      title: "Complete Tasks",
      description: "Share posts, refer friends, and engage with content"
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      description: "Get BIT tokens as rewards for each completed task"
    },
    {
      icon: TrendingUp,
      title: "Level Up",
      description: "Unlock higher tier rewards as you complete more tasks"
    }
  ];

  const exchangeShopSteps = [
    {
      icon: Store,
      title: "Browse Items",
      description: "Explore products and services available in the marketplace"
    },
    {
      icon: ShoppingCart,
      title: "Select Product",
      description: "Choose your desired item and check the BIT token price"
    },
    {
      icon: Coins,
      title: "Pay with BIT",
      description: "Use your BIT tokens to purchase the item"
    },
    {
      icon: Gift,
      title: "Receive Product",
      description: "Get your product delivered or access your digital service"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to make the most of the Bit Access ecosystem
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="buy-bit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            <TabsTrigger value="buy-bit">Buy BIT</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="exchange-shop">Exchange Shop</TabsTrigger>
          </TabsList>

          {/* Buy BIT Content */}
          <TabsContent value="buy-bit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                    How to Buy BIT Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Purchase BIT tokens easily using popular stablecoins on multiple blockchains.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {buyBitSteps.map((step, index) => (
                      <div key={index} className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Staking Content */}
          <TabsContent value="staking">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    How Staking Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Stake your BIT tokens to earn passive income with competitive APY rates.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stakingSteps.map((step, index) => (
                      <div key={index} className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community Content */}
          <TabsContent value="community">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    Community Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Participate in community activities and earn BIT token rewards.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {communitySteps.map((step, index) => (
                      <div key={index} className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Exchange Shop Content */}
          <TabsContent value="exchange-shop">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <Store className="w-8 h-8 text-primary" />
                    Exchange Shop Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Use your BIT tokens to purchase real products and services.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exchangeShopSteps.map((step, index) => (
                      <div key={index} className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HowItWorks;
