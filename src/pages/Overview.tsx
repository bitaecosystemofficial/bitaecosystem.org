import { motion } from 'framer-motion';
import { Wallet, Award, Lock, Users, ShoppingCart, Gift, TrendingUp, Repeat, Crown, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import usdtLogo from '@/assets/usdt-logo.png';
import usdcLogo from '@/assets/usdc-logo.png';
import aboutUsImage from '@/assets/about-us-image.png';

const Overview = () => {
  const sections = [
    {
      icon: Wallet,
      image: aboutUsImage,
      title: 'About Us',
      content:
        'Bit Access (BIT) is a revolutionary reward token that incentivizes Web3 adoption. Merchants accept USDT/USDC stablecoins for payments, while customers earn BIT tokens as rewards, creating a win-win ecosystem for all participants.',
    },
    {
      icon: Users,
      image: aboutUsImage,
      title: 'Mission & Vision',
      content:
        'Our mission is to bridge traditional commerce with Web3 through stablecoin payments and reward tokens. We envision a future where merchants benefit from instant settlements and customers earn valuable rewards with every purchase.',
    },
    {
      icon: Award,
      image: aboutUsImage,
      title: 'Core Values',
      content: '',
      values: [
        'Transparency: All transactions on blockchain with full audit trails',
        'Innovation: Bridging Web2 commerce with Web3 technology',
        'Community: Building a sustainable ecosystem for all participants',
        'Security: Enterprise-grade protection and multi-sig wallets',
        'Accessibility: Simple onboarding for users of all experience levels',
        'Sustainability: Long-term value creation through deflationary tokenomics'
      ],
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
        <div className="space-y-16 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    {/* Image */}
                    <div className={`relative h-64 md:h-auto overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <section.icon className="w-10 h-10 text-primary" />
                        <h2 className="text-3xl font-bold">{section.title}</h2>
                      </div>
                      
                      {section.content && (
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                          {section.content}
                        </p>
                      )}
                      
                      {section.values && (
                        <ul className="space-y-3 mt-4">
                          {section.values.map((value, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{value}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
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
