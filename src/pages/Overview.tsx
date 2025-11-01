import { motion } from 'framer-motion';
import { Wallet, Award, Lock, Users, ShoppingCart, Gift, TrendingUp, Repeat, Crown, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import usdtLogo from '@/assets/usdt-logo.png';
import usdcLogo from '@/assets/usdc-logo.png';

const Overview = () => {
  const sections = [
    {
      icon: Wallet,
      title: 'What is Bit Access?',
      content:
        'Bit Access (BIT) is a revolutionary reward token that incentivizes Web3 adoption. Merchants accept USDT/USDC stablecoins for payments, while customers earn BIT tokens as rewards, creating a win-win ecosystem for all participants.',
    },
    {
      icon: Users,
      title: 'Mission & Vision',
      content:
        'Our mission is to bridge traditional commerce with Web3 through stablecoin payments and reward tokens. We envision a future where merchants benefit from instant settlements and customers earn valuable rewards with every purchase.',
    },
    {
      icon: Lock,
      title: 'Simple & Secure',
      content:
        'Connect your wallet in seconds with our intuitive Web3Modal integration. Your transactions are secured by blockchain technology while maintaining the simplicity of traditional payment systems.',
    },
  ];

  const tokenUtility = [
    {
      icon: ShoppingCart,
      title: 'Buy BIT',
      description: 'Purchase BIT tokens using USDT-BEP20 or USDC-BEP20 at $0.00108 per BIT. Available on BSC, Polygon, Arbitrum, and Base networks. Minimum purchase of 100,000 BIT tokens to get started.',
      color: 'from-primary/20 to-primary/5',
      logos: [usdtLogo, usdcLogo],
    },
    {
      icon: Gift,
      title: 'Collect BIT',
      description: 'Earn BIT tokens as rewards through multiple activities: daily login bonuses, referral programs, completing community tasks, shopping at partner merchants, and participating in ecosystem events.',
      color: 'from-accent/20 to-accent/5',
    },
    {
      icon: Lock,
      title: 'Stake & Grow BIT',
      description: 'Lock your BIT tokens in our staking platform to earn passive rewards. Choose from multiple staking tiers with competitive APY rates. The longer you stake, the higher your potential rewards.',
      color: 'from-muted/20 to-muted/5',
    },
    {
      icon: Repeat,
      title: 'Swap BIT',
      description: 'Seamlessly swap your BIT tokens with other cryptocurrencies through our integrated DEX functionality. Trade with minimal fees, instant execution, and full transparency on the blockchain.',
      color: 'from-secondary/20 to-secondary/5',
    },
    {
      icon: TrendingUp,
      title: 'Earn BIT',
      description: 'Generate BIT token rewards by staking, referring friends, shopping at partner merchants, participating in governance, and contributing to community growth. Multiple earning streams available.',
      color: 'from-primary/20 to-primary/5',
    },
    {
      icon: Crown,
      title: 'Membership Benefits',
      description: 'Unlock exclusive perks with tiered membership levels. Higher tiers offer premium features, enhanced reward multipliers, priority support, and early access to new opportunities.',
      color: 'from-accent/20 to-accent/5',
    },
  ];

  const roadmap = [
    {
      phase: 'Phase 1: Foundation',
      items: ['Token launch and initial distribution', 'Smart contract deployment across networks', 'Launch staking platform with multiple tiers', 'Onboard first merchant partners'],
    },
    {
      phase: 'Phase 2: Expansion',
      items: ['DEX integration for token swaps', 'Mobile wallet app development', 'Expand merchant network globally', 'Implement tiered membership system'],
    },
    {
      phase: 'Phase 3: Ecosystem Growth',
      items: ['Launch governance platform for voting', 'Cross-chain bridge implementation', 'Advanced analytics dashboard release', 'Partnership with major e-commerce platforms'],
    },
    {
      phase: 'Phase 4: Mass Adoption',
      items: ['Global payment processor integration', 'Enterprise merchant solutions', 'DeFi yield farming opportunities', 'Worldwide community expansion'],
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Overview</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Bit Access is revolutionizing the way we think about payments and rewards in the Web3 era
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border h-full hover:border-primary transition-all duration-300">
                <CardHeader>
                  <section.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Token Utility Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">BIT Token Utility</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            BIT serves as rewards within our ecosystem - Multiple ways to buy, collect, stake, swap, and earn
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenUtility.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-gradient-to-br ${item.color} border-border h-full`}>
                  <CardContent className="p-8">
                    <item.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    {item.logos && (
                      <div className="flex gap-2 items-center pt-2">
                        <span className="text-xs text-muted-foreground">Payment:</span>
                        {item.logos.map((logo, i) => (
                          <img key={i} src={logo} alt="Crypto Logo" className="w-5 h-5" />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Development Roadmap</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our strategic plan for ecosystem growth and expansion
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold">{phase.phase}</h3>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-12 text-center">
              <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Built on industry-leading blockchain infrastructure with enterprise-grade security protocols. Fully
                compliant with international regulations to ensure safe, transparent transactions for all users.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
