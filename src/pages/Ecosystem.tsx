import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Gift, TrendingUp, Users, Store, Coins, Lock, Repeat, CalendarCheck, Crown, Zap, Shield, Code, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Ecosystem = () => {
  const coreComponents = [
    {
      icon: Coins,
      title: 'Buy BIT',
      description: 'Purchase BIT tokens using USDT-BEP20 or USDC-BEP20 at a fixed price of $0.00108 per BIT. Available on BSC, Polygon, Arbitrum, and Base networks. Minimum purchase of 100,000 BIT tokens to get started.',
    },
    {
      icon: Gift,
      title: 'Collect BIT',
      description: 'Earn BIT tokens as rewards through multiple activities: daily login bonuses, referral programs, completing tasks, participating in community events, and engaging with our ecosystem partners.',
    },
    {
      icon: Lock,
      title: 'Stake & Grow BIT',
      description: 'Lock your BIT tokens in our staking platform to earn passive rewards. Choose from multiple staking tiers with competitive APY rates. The longer you stake, the higher your rewards potential.',
    },
    {
      icon: Repeat,
      title: 'Swap BIT',
      description: 'Seamlessly swap your BIT tokens with other cryptocurrencies through our integrated DEX. Trade with minimal fees, instant execution, and full transparency on the blockchain.',
    },
    {
      icon: TrendingUp,
      title: 'Earn BIT',
      description: 'Generate BIT token rewards by staking, referring friends, shopping at partner merchants, participating in governance, and contributing to community growth. Multiple earning streams available.',
    },
    {
      icon: Crown,
      title: 'Membership Benefits',
      description: 'Unlock exclusive perks with tiered membership levels. Higher tiers offer premium features, enhanced reward multipliers, priority support, and early access to new opportunities.',
    },
  ];

  const tokenHolderBenefits = [
    'Stake BIT tokens to earn competitive APY rewards passively',
    'Access tiered membership benefits with exclusive perks and features',
    'Participate in governance voting to shape ecosystem decisions',
    'Receive enhanced reward multipliers for long-term holding',
    'Earn bonus BIT rewards through referral program participation',
    'Get priority access to new features and token sale events',
    'Unlock premium support channels and dedicated account management',
    'Build reputation score for increased rewards and special opportunities',
  ];

  const merchantBenefits = [
    'Accept USDT/USDC payments on BSC, Polygon, Arbitrum, and Base networks',
    'Receive instant settlement in stablecoins with zero chargeback risk',
    'Earn BIT token rewards for every transaction processed',
    'Access comprehensive analytics dashboard for sales and BIT earnings',
    'Get BIT bonus rewards for achieving monthly transaction milestones',
    'Benefit from lower transaction fees compared to traditional payment processors',
    'Earn additional BIT rewards for referring new merchant partners',
    'Integrate easily with existing POS systems and e-commerce platforms',
  ];

  const customerBenefits = [
    'Pay merchants using USDT/USDC across 4 blockchain networks',
    'Earn BIT token cashback rewards on every purchase made',
    'Receive instant payment confirmation with blockchain transparency',
    'Collect bonus BIT rewards for shopping frequency milestones',
    'Access exclusive merchant discounts and promotional offers',
    'Choose preferred network based on transaction fees and speed',
    'Earn additional BIT tokens through customer referral programs',
    'Progress through reward tiers to unlock enhanced cashback rates',
  ];

  const communityBenefits = [
    'Earn BIT rewards for active participation in community events',
    'Participate in regular airdrops and community reward distributions',
    'Create educational content to earn BIT token incentives',
    'Engage in governance proposals and voting for BIT rewards',
    'Complete social media tasks and campaigns for BIT earnings',
    'Contribute to forums and help other members for reward bonuses',
    'Join ambassador programs to earn consistent BIT incentives',
    'Access exclusive community-only features and early announcements',
  ];


  const techStack = [
    {
      icon: Shield,
      title: 'Multi-Chain Support',
      description: 'BSC, Polygon, Arbitrum, Base',
    },
    {
      icon: Code,
      title: 'Smart Contracts',
      description: 'Audited Solidity contracts',
    },
    {
      icon: Lock,
      title: 'Security First',
      description: 'Multi-sig wallets & regular audits',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Ecosystem</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete Web3 payment ecosystem connecting users, merchants, and opportunities
          </p>
        </motion.div>

        {/* Core Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">BIT Token Utility</h2>
          <p className="text-center text-muted-foreground mb-12">
            BIT tokens serve as rewards within our ecosystem - not as payment or security
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <component.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{component.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ecosystem Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">BIT Rewards Ecosystem</h2>
          <p className="text-center text-muted-foreground mb-12">
            Earn BIT tokens as rewards - Payments processed via USDT/USDC on 4 networks
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Token Holders</h3>
                </div>
                <ul className="space-y-3">
                  {tokenHolderBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For the Community</h3>
                </div>
                <ul className="space-y-3">
                  {communityBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Customers</h3>
                </div>
                <ul className="space-y-3">
                  {customerBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Store className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">For Merchants</h3>
                </div>
                <ul className="space-y-3">
                  {merchantBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* How Ecosystem Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">How Ecosystem Works</h2>
          <p className="text-center text-muted-foreground mb-12">
            A complete flow of value creation within the BIT ecosystem
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      1
                    </div>
                    <Store className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Merchants Accept USDT/USDC</h3>
                  <p className="text-muted-foreground text-sm">
                    Partner merchants accept stablecoin payments (USDT/USDC) on BSC, Polygon, Arbitrum, and Base networks for goods and services
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-secondary/30 to-secondary/10 border-secondary/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      2
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Customers Pay with Stablecoins</h3>
                  <p className="text-muted-foreground text-sm">
                    Customers complete purchases using USDT/USDC from their Web3 wallets with instant settlement and blockchain transparency
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      3
                    </div>
                    <Gift className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">BIT Rewards Distributed</h3>
                  <p className="text-muted-foreground text-sm">
                    Both customers and merchants earn BIT tokens as rewards for every transaction - creating mutual value and incentivizing adoption
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      4
                    </div>
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Stake BIT for Rewards</h3>
                  <p className="text-muted-foreground text-sm">
                    Token holders stake BIT to earn passive APY rewards, contributing to ecosystem stability and earning additional tokens
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-secondary/30 to-secondary/10 border-secondary/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      5
                    </div>
                    <Repeat className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Trade & Utilize BIT</h3>
                  <p className="text-muted-foreground text-sm">
                    Swap BIT on DEX, access tiered benefits, participate in governance, and unlock exclusive perks throughout the ecosystem
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                      6
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Ecosystem Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    More merchants join, more customers earn, more value created - a self-sustaining cycle of Web3 adoption and growth
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Technology Stack</h2>
          <p className="text-center text-muted-foreground mb-12">
            Built on industry-leading blockchain infrastructure
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-primary/30 hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <tech.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecosystem;
