import { motion } from "framer-motion";
import { ArrowRight, Gift, Rocket, Lock, RefreshCw, Store, Users, Zap, Coins, TrendingUp, BarChart3, Network, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useNavigate } from "react-router-dom";
import { useTokenHolders } from "@/hooks/useTokenHolders";
import heroBg from "@/assets/hero-bg-new.jpg";
import bscLogo from "@/assets/bsc-logo.png";
import polygonLogo from "@/assets/polygon-logo.png";
import arbitrumLogo from "@/assets/arbitrum-logo.png";
import baseLogo from "@/assets/base-logo.png";
import partner1 from "@/assets/partner-1.png";
import partner2 from "@/assets/partner-2.png";
import partner3 from "@/assets/partner-3.png";
import partner4 from "@/assets/partner-4.png";
import partner7 from "@/assets/partner-7.png";
import partner8 from "@/assets/partner-8.png";
import partner9 from "@/assets/partner-9.png";
import partner10 from "@/assets/partner-10.png";
import partner11 from "@/assets/partner-11.png";
import partner12 from "@/assets/partner-12.png";
import dexscreenerLogo from "@/assets/dexscreener-logo.png";
import metamaskPartner from "@/assets/metamask-partner.png";
import trustWalletPartner from "@/assets/trust-wallet-partner.png";
const Home = () => {
  const {
    open
  } = useWeb3Modal();
  const navigate = useNavigate();
  const { holderCount, loading } = useTokenHolders();
  
  const stats = [{
    label: "Community Members",
    value: "4K+",
    icon: Users
  }, {
    label: "BIT Tokens",
    value: "100B",
    icon: Coins
  }, {
    label: "Token Holders",
    value: "5,245",
    icon: TrendingUp
  }, {
    label: "Token Transfers",
    value: "Live",
    icon: Zap,
    badge: true
  }];
  const ecosystemFeatures = [{
    icon: Gift,
    title: "Airdrops & Rewards",
    description: "Participate in regular token airdrops and earn rewards through community engagement and referrals."
  }, {
    icon: Rocket,
    title: "Token Presale",
    description: "Early access to BIT tokens with bonus allocations and exclusive benefits for early supporters."
  }, {
    icon: Lock,
    title: "Staking Rewards",
    description: "Stake your BIT tokens to earn passive income while supporting network security and governance."
  }, {
    icon: RefreshCw,
    title: "Token Swap",
    description: "Seamlessly swap BIT tokens with other cryptocurrencies through our integrated decentralized exchange."
  }, {
    icon: Store,
    title: "Merchant Network",
    description: "Join our growing network of merchants accepting BIT tokens with special subscription packages."
  }, {
    icon: Users,
    title: "Community Hub",
    description: "Connect with fellow BIT holders, participate in social activities, and engage in community-driven initiatives."
  }, {
    icon: Zap,
    title: "Daily Rewards",
    description: "Try your luck with our daily claim game for a chance to win BIT tokens and other rewards."
  }, {
    icon: Network,
    title: "BSC Integration",
    description: "Built on Binance Smart Chain for fast, low-cost transactions and seamless integration with the BSC ecosystem."
  }];
  const blockchainNetworks = [{
    name: "BNB Chain",
    description: "Fast, low-cost transactions on BNB Smart Chain",
    color: "from-yellow-500 to-yellow-600",
    logo: bscLogo
  }, {
    name: "Polygon",
    description: "Scalable Ethereum Layer 2 solution",
    color: "from-purple-500 to-purple-600",
    logo: polygonLogo
  }, {
    name: "Base",
    description: "Coinbase's Ethereum L2 network",
    color: "from-blue-500 to-blue-600",
    logo: baseLogo
  }, {
    name: "Arbitrum",
    description: "Optimistic rollup for Ethereum scaling",
    color: "from-cyan-500 to-cyan-600",
    logo: arbitrumLogo
  }];
  const partners = [{
    name: "DexScreener",
    category: "DEX Analytics Platform",
    logo: dexscreenerLogo
  }, {
    name: "PancakeSwap",
    category: "Leading DEX on BNB Chain",
    logo: partner2
  }, {
    name: "Uniswap",
    category: "Decentralized Trading Protocol",
    logo: partner3
  }, {
    name: "CoinGecko",
    category: "Cryptocurrency Data Aggregator",
    logo: partner4
  }, {
    name: "MetaMask",
    category: "Leading Crypto Wallet",
    logo: metamaskPartner
  }, {
    name: "Trust Wallet",
    category: "Multi-Chain Wallet",
    logo: trustWalletPartner
  }, {
    name: "CoinMarketCap",
    category: "Price Tracking",
    logo: partner7
  }, {
    name: "DappRadar",
    category: "DApp Analytics",
    logo: partner8
  }, {
    name: "GoPlus Security",
    category: "Security Platform",
    logo: partner9
  }, {
    name: "Binplorer",
    category: "Blockchain Explorer",
    logo: partner10
  }, {
    name: "BscScan",
    category: "BNB Chain Block Explorer",
    logo: partner11
  }, {
    name: "Cyberscope",
    category: "Smart Contract Audits",
    logo: partner12
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 text-base px-4 py-2 bg-primary/20 text-primary border-primary/50">
              Unlocking Values, Empowering Communities
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Bit Access Ecosystem
            </h2>
            <p className="text-2xl md:text-3xl mb-4 text-foreground font-semibold">
              Powering the future of digital transactions
            </p>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Empowering blockchain communities through our comprehensive ecosystem and BIT utility token.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/ecosystem")} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Explore
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6" onClick={() => open()}>
                Connect Wallet
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20">
            {stats.map((stat, index) => <Card key={index} className="bg-card/80 backdrop-blur-lg border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    {stat.value}
                    {stat.badge && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>)}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Features Section */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Ecosystem Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the full range of features and services available within the BitAccess ecosystem on Binance Smart
              Chain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemFeatures.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.05
          }} viewport={{
            once: true
          }}>
                <Card className="bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Cross-Chain Network Support */}
      <section className="py-20 relative bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Cross-Chain Network Support</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BIT Token is available across multiple blockchain networks for maximum accessibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blockchainNetworks.map((network, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all h-full group overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${network.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-white">
                        <img src={network.logo} alt={`${network.name} logo`} className="w-16 h-16" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">{network.name}</h3>
                    <p className="text-muted-foreground text-sm text-center">{network.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Blockchain Strategic Partners</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic partnerships across major blockchain ecosystems, exchanges, and analytics platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.4,
            delay: index * 0.03
          }} viewport={{
            once: true
          }}>
                <Card className="bg-card/50 border-border hover:border-primary/50 hover:bg-card transition-all h-full group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex items-center justify-center">
                      <img src={partner.logo} alt={`${partner.name} logo`} className="w-20 h-20 object-contain" />
                    </div>
                    <h3 className="font-bold mb-1 text-base">{partner.name}</h3>
                    <p className="text-xs text-muted-foreground">{partner.category}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="text-center mt-12">
            <p className="text-lg text-muted-foreground italic">
              Building the future through strategic blockchain integrations
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
            <Card className="bg-card/80 backdrop-blur-lg border-primary/30 shadow-2xl shadow-primary/10">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl md:text-5xl font-bold mb-4">Ready to Join with Us</CardTitle>
                <CardDescription className="text-lg md:text-xl max-w-3xl mx-auto">
                  Don't miss out on exclusive presale opportunities, airdrops, and early access to our complete
                  ecosystem of blockchain tools and services.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-4 pb-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button size="lg" onClick={() => open()} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                    <Users className="mr-2" size={20} />
                    Bit Access Affiliates
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6" onClick={() => navigate("/helpdesk")}>
                    <FileText className="mr-2" size={20} />
                    Explore Documentation
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <BarChart3 className="w-4 h-4" />
                  <span>Join 4,000+ community members building the future</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default Home;