import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, PieChart, Lock, ShoppingCart, Gift, ArrowRightLeft, Wallet, Crown, Users, Store, TrendingUp, Flame, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tokenomics = () => {
  const keyMetrics = [
    { label: "Token Name", value: "Bit Access (BIT)" },
    { label: "Total Supply", value: "100,000,000,000 BIT" },
    { label: "Decimals", value: "9" },
    { label: "Initial Price", value: "$0.00108 USDT/USDC" },
    { label: "Token Type", value: "Reward Token (BEP-20)" },
    { label: "Burn Mechanism", value: "Active" }
  ];

  const stakingAPY = [
    { duration: "180 Days Lock", apy: "12% APY", color: "bg-primary" },
    { duration: "240 Days Lock", apy: "18% APY", color: "bg-accent" },
    { duration: "365 Days Lock", apy: "25% APY", color: "bg-secondary" }
  ];

  const tokenUsage = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Buy BIT",
      description: "Purchase BIT tokens using USDT-BEP20 or USDC-BEP20 at a fixed price of $0.00108 per BIT. Available on BSC, Polygon, Arbitrum, and Base networks. Minimum purchase of 100,000 BIT tokens to get started."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Collect BIT",
      description: "Earn BIT tokens as rewards through multiple activities: daily login bonuses, referral programs, completing tasks, participating in community events, and engaging with our ecosystem partners."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Stake & Grow BIT",
      description: "Lock your BIT tokens in our staking platform to earn passive rewards. Choose from multiple staking tiers with competitive APY rates. The longer you stake, the higher your rewards potential."
    },
    {
      icon: <ArrowRightLeft className="w-6 h-6" />,
      title: "Swap BIT",
      description: "Seamlessly swap your BIT tokens with other cryptocurrencies through our integrated DEX. Trade with minimal fees, instant execution, and full transparency on the blockchain."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Earn BIT",
      description: "Generate BIT token rewards by staking, referring friends, shopping at partner merchants, participating in governance, and contributing to community growth. Multiple earning streams available."
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Membership Benefits",
      description: "Unlock exclusive perks with tiered membership levels. Higher tiers offer premium features, enhanced reward multipliers, priority support, and early access to new opportunities."
    }
  ];

  const tokenDistribution = [
    { category: "Project Development", percentage: 35, color: "bg-primary" },
    { category: "Company Reserved", percentage: 5, color: "bg-accent" },
    { category: "Token Burned", percentage: 10, color: "bg-destructive" },
    { category: "P2P", percentage: 10, color: "bg-secondary" },
    { category: "Marketing", percentage: 10, color: "bg-primary/70" },
    { category: "Liquidity CEX", percentage: 10, color: "bg-accent/70" },
    { category: "Presale", percentage: 5, color: "bg-secondary/70" },
    { category: "Liquidity DEX", percentage: 5, color: "bg-primary/50" },
    { category: "Management Team", percentage: 3, color: "bg-accent/50" },
    { category: "Foundation", percentage: 2, color: "bg-secondary/50" },
    { category: "Emergency Fund", percentage: 2, color: "bg-primary/30" },
    { category: "Staking", percentage: 1, color: "bg-accent/30" },
    { category: "Airdrops, Rewards & Bounty", percentage: 1, color: "bg-secondary/30" },
    { category: "Creator Dev", percentage: 1, color: "bg-primary/20" }
  ];

  const fundingAllocation = [
    { category: "Product Development", percentage: 17, color: "bg-primary" },
    { category: "Marketing", percentage: 14, color: "bg-accent" },
    { category: "Company Funds", percentage: 10, color: "bg-secondary" },
    { category: "Team", percentage: 9, color: "bg-primary/70" },
    { category: "Business Operations", percentage: 9, color: "bg-accent/70" },
    { category: "Community Rewards", percentage: 8, color: "bg-secondary/70" },
    { category: "Legal & Regulation", percentage: 6, color: "bg-primary/50" },
    { category: "Taxes", percentage: 5, color: "bg-accent/50" },
    { category: "Contingency", percentage: 5, color: "bg-secondary/50" },
    { category: "Sponsors & Partnerships", percentage: 5, color: "bg-primary/30" },
    { category: "Advisors", percentage: 4, color: "bg-accent/30" },
    { category: "Charity Works", percentage: 4, color: "bg-secondary/30" }
  ];

  const benefitsData = {
    holders: [
      "Stake BIT tokens to earn competitive APY rewards passively",
      "Access tiered membership benefits with exclusive perks and features",
      "Participate in governance voting to shape ecosystem decisions",
      "Receive enhanced reward multipliers for long-term holding",
      "Earn bonus BIT rewards through referral program participation",
      "Get priority access to new features and token sale events",
      "Unlock premium support channels and dedicated account management",
      "Build reputation score for increased rewards and special opportunities"
    ],
    community: [
      "Earn BIT rewards for active participation in community events",
      "Participate in regular airdrops and community reward distributions",
      "Create educational content to earn BIT token incentives",
      "Engage in governance proposals and voting for BIT rewards",
      "Complete social media tasks and campaigns for BIT earnings",
      "Contribute to forums and help other members for reward bonuses",
      "Join ambassador programs to earn consistent BIT incentives",
      "Access exclusive community-only features and early announcements"
    ],
    customers: [
      "Pay merchants using USDT/USDC across 4 blockchain networks",
      "Earn BIT token cashback rewards on every purchase made",
      "Receive instant payment confirmation with blockchain transparency",
      "Collect bonus BIT rewards for shopping frequency milestones",
      "Access exclusive merchant discounts and promotional offers",
      "Choose preferred network based on transaction fees and speed",
      "Earn additional BIT tokens through customer referral programs",
      "Progress through reward tiers to unlock enhanced cashback rates"
    ],
    merchants: [
      "Accept USDT/USDC payments on BSC, Polygon, Arbitrum, and Base networks",
      "Receive instant settlement in stablecoins with zero chargeback risk",
      "Earn BIT token rewards for every transaction processed",
      "Access comprehensive analytics dashboard for sales and BIT earnings",
      "Get BIT bonus rewards for achieving monthly transaction milestones",
      "Benefit from lower transaction fees compared to traditional payment processors",
      "Earn additional BIT rewards for referring new merchant partners",
      "Integrate easily with existing POS systems and e-commerce platforms"
    ]
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PieChart className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Token Distribution & Allocation
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The BIT Token Distribution and Allocation outlines the planned distribution of the BIT tokens to ensure a balanced, fair, and sustainable ecosystem.
          </p>
          <p className="text-md text-muted-foreground mt-2">
            Main Applications: Business, E-commerce & Community Services
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Coins className="w-6 h-6 text-primary" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {keyMetrics.map((metric, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{metric.label}:</span>
                    <span className="text-lg font-semibold text-primary">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deflationary Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Flame className="w-6 h-6 text-destructive" />
                Deflationary Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                <span className="font-bold text-destructive">0.5%</span> of every transaction is burned, reducing total supply over time and increasing scarcity.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Staking APY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                Staking APY
              </CardTitle>
              <CardDescription>Earn competitive rewards by locking your BIT tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stakingAPY.map((stake, index) => (
                  <Card key={index} className="bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader>
                      <CardTitle className="text-lg">{stake.duration}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">{stake.apy}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Token Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenUsage.map((usage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {usage.icon}
                      </div>
                      <CardTitle className="text-xl">{usage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{usage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BIT Rewards Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                BIT Rewards Ecosystem
              </CardTitle>
              <CardDescription>Earn BIT tokens as rewards - Payments processed via USDT/USDC on 4 networks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="holders" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
                  <TabsTrigger value="holders">Token Holders</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="merchants">Merchants</TabsTrigger>
                </TabsList>

                <TabsContent value="holders" className="space-y-2">
                  <h3 className="font-semibold text-lg mb-3">For Token Holders</h3>
                  <ul className="space-y-2">
                    {benefitsData.holders.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="community" className="space-y-2">
                  <h3 className="font-semibold text-lg mb-3">For the Community</h3>
                  <ul className="space-y-2">
                    {benefitsData.community.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="customers" className="space-y-2">
                  <h3 className="font-semibold text-lg mb-3">For Customers</h3>
                  <ul className="space-y-2">
                    {benefitsData.customers.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="merchants" className="space-y-2">
                  <h3 className="font-semibold text-lg mb-3">For Merchants</h3>
                  <ul className="space-y-2">
                    {benefitsData.merchants.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Token Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Token Distribution</CardTitle>
              <CardDescription>Distribution of 100B BIT tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tokenDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.category}</span>
                      <span className="text-muted-foreground font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Funding Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Funding Allocation</CardTitle>
              <CardDescription>How raised funds will be used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fundingAllocation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.category}</span>
                      <span className="text-muted-foreground font-semibold">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Tokenomics;
