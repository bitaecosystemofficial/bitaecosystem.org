import { motion } from "framer-motion";
import { Book, HelpCircle, Shield, FileText, Cookie, PieChart as PieChartIcon, TrendingUp, Target, Map, Gift, Users, Coins, Lock, Rocket, Globe, Vote, GraduationCap, Network, Send, CheckCircle, Circle, Clock, FileCheck2, Download, AlertTriangle, CheckCircle2, XCircle, Repeat, Mail, Facebook, Twitter, MessageCircle, Github } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
const Helpdesk = () => {
  const whitepaperSections = [{
    title: "The Evolution of Blockchain and the Rise of BIT Access",
    content: `As the blockchain ecosystem continued to evolve, so did the vision of BIT Access. The project set out to bridge the gap between traditional industries and blockchain technology, exploring the advantages of using cryptocurrencies and decentralized applications (DApps) in areas such as:

• E-commerce: Revolutionizing online shopping by offering new payment methods, loyalty rewards, and rebate systems based on cryptocurrency.
• Business: Providing businesses with more efficient, secure, and transparent systems for transactions, supply chain management, and customer engagement.
• Education: Enabling educators and learners to interact in decentralized environments, tokenize learning content, and offer incentive-driven rewards using BIT tokens.
• Merchant Services: Empowering merchants to adopt decentralized payment systems, gain access to global markets, and benefit from lower transaction fees.

With the introduction of BIT Access, Dr. Duaso sought to create an ecosystem that provided individuals and businesses with the access and tools needed to thrive in an ever-changing digital landscape.`
  }, {
    title: "The Road Ahead: BIT Access as a Leading Digital Asset",
    content: `The concept of BIT Access goes beyond just cryptocurrency—it represents a shift in how digital assets and blockchain technologies will shape the future. By offering access to information, rewarding participants with tokens, and providing tools to foster innovation, BIT Access is positioned to become a leading force in the cryptocurrency and blockchain space.

BIT Access is not just about the future of decentralized finance (DeFi); it is about a larger vision of the future of digital assets in the next generation. Dr. Duaso and the team at BIT Access believe that BIT tokens will one day be recognized as one of the top digital assets in the cryptocurrency world.`
  }];

  // Token Usage - Updated from Ecosystem
  const tokenUsage = [{
    icon: Coins,
    title: "Buy BIT",
    description: "Purchase BIT tokens using USDT-BEP20 or USDC-BEP20 at a fixed price of $0.00108 per BIT. Available on BSC, Polygon, Arbitrum, and Base networks. Minimum purchase of 100,000 BIT tokens to get started."
  }, {
    icon: Gift,
    title: "Collect BIT",
    description: "Earn BIT tokens as rewards through multiple activities: daily login bonuses, referral programs, completing tasks, participating in community events, and engaging with our ecosystem partners."
  }, {
    icon: Lock,
    title: "Stake & Grow BIT",
    description: "Lock your BIT tokens in our staking platform to earn passive rewards. Choose from multiple staking tiers with competitive APY rates. The longer you stake, the higher your rewards potential."
  }, {
    icon: Repeat,
    title: "Swap BIT",
    description: "Seamlessly swap your BIT tokens with other cryptocurrencies through our integrated DEX. Trade with minimal fees, instant execution, and full transparency on the blockchain."
  }, {
    icon: TrendingUp,
    title: "Earn BIT",
    description: "Generate BIT token rewards by staking, referring friends, shopping at partner merchants, participating in governance, and contributing to community growth. Multiple earning streams available."
  }, {
    icon: Rocket,
    title: "Membership Benefits",
    description: "Unlock exclusive perks with tiered membership levels. Higher tiers offer premium features, enhanced reward multipliers, priority support, and early access to new opportunities."
  }];

  // Ecosystem Benefits - Updated from Ecosystem
  const tokenHolderBenefits = ['Stake BIT tokens to earn competitive APY rewards passively', 'Access tiered membership benefits with exclusive perks and features', 'Participate in governance voting to shape ecosystem decisions', 'Receive enhanced reward multipliers for long-term holding', 'Earn bonus BIT rewards through referral program participation', 'Get priority access to new features and token sale events', 'Unlock premium support channels and dedicated account management', 'Build reputation score for increased rewards and special opportunities'];
  const merchantBenefits = ['Accept USDT/USDC payments on BSC, Polygon, Arbitrum, and Base networks', 'Receive instant settlement in stablecoins with zero chargeback risk', 'Earn BIT token rewards for every transaction processed', 'Access comprehensive analytics dashboard for sales and BIT earnings', 'Get BIT bonus rewards for achieving monthly transaction milestones', 'Benefit from lower transaction fees compared to traditional payment processors', 'Earn additional BIT rewards for referring new merchant partners', 'Integrate easily with existing POS systems and e-commerce platforms'];
  const customerBenefits = ['Pay merchants using USDT/USDC across 4 blockchain networks', 'Earn BIT token cashback rewards on every purchase made', 'Receive instant payment confirmation with blockchain transparency', 'Collect bonus BIT rewards for shopping frequency milestones', 'Access exclusive merchant discounts and promotional offers', 'Choose preferred network based on transaction fees and speed', 'Earn additional BIT tokens through customer referral programs', 'Progress through reward tiers to unlock enhanced cashback rates'];
  const communityBenefits = ['Earn BIT rewards for active participation in community events', 'Participate in regular airdrops and community reward distributions', 'Create educational content to earn BIT token incentives', 'Engage in governance proposals and voting for BIT rewards', 'Complete social media tasks and campaigns for BIT earnings', 'Contribute to forums and help other members for reward bonuses', 'Join ambassador programs to earn consistent BIT incentives', 'Access exclusive community-only features and early announcements'];

  // Tokenomics Data
  const tokenAllocationData = [{
    name: "Project Development",
    value: 35.0,
    color: "#FFD700"
  }, {
    name: "Company Reserved",
    value: 5.0,
    color: "#FFA500"
  }, {
    name: "Token Burned",
    value: 10.0,
    color: "#FF4500"
  }, {
    name: "P2P",
    value: 10.0,
    color: "#FF8C00"
  }, {
    name: "Marketing",
    value: 10.0,
    color: "#FF7F50"
  }, {
    name: "Liquidity CEX",
    value: 10.0,
    color: "#FF6347"
  }, {
    name: "Presale",
    value: 5.0,
    color: "#FFB347"
  }, {
    name: "Liquidity DEX",
    value: 5.0,
    color: "#FFA07A"
  }, {
    name: "Management Team",
    value: 3.0,
    color: "#FA8072"
  }, {
    name: "Foundation",
    value: 2.0,
    color: "#E9967A"
  }, {
    name: "Emergency Fund",
    value: 2.0,
    color: "#F08080"
  }, {
    name: "Staking",
    value: 1.0,
    color: "#CD5C5C"
  }, {
    name: "Airdrops, Rewards & Bounty",
    value: 1.0,
    color: "#DC143C"
  }, {
    name: "Creator Dev",
    value: 1.0,
    color: "#B22222"
  }];
  const fundAllocationData = [{
    name: "Product Development",
    value: 17,
    color: "#FFD700"
  }, {
    name: "Marketing",
    value: 14,
    color: "#FFA500"
  }, {
    name: "Company Funds",
    value: 10,
    color: "#FF8C00"
  }, {
    name: "Team",
    value: 9,
    color: "#FF7F50"
  }, {
    name: "Business Operations",
    value: 9,
    color: "#FF6347"
  }, {
    name: "Community Rewards",
    value: 8,
    color: "#FFB347"
  }, {
    name: "Legal & Regulation",
    value: 6,
    color: "#FFA07A"
  }, {
    name: "Taxes",
    value: 5,
    color: "#FA8072"
  }, {
    name: "Contingency",
    value: 5,
    color: "#E9967A"
  }, {
    name: "Sponsors & Partnerships",
    value: 5,
    color: "#F08080"
  }, {
    name: "Advisors",
    value: 4,
    color: "#CD5C5C"
  }, {
    name: "Charity Works",
    value: 4,
    color: "#DC143C"
  }];
  const roadmapPhases = [{
    phase: "Phase 1: Foundation",
    title: "Foundation",
    status: "completed",
    items: ["Token launch and initial distribution", "Smart contract deployment across networks", "Launch staking platform with multiple tiers", "Onboard first merchant partners"]
  }, {
    phase: "Phase 2: Expansion",
    title: "Expansion",
    status: "current",
    items: ["DEX integration for token swaps", "Mobile wallet app development", "Expand merchant network globally", "Implement tiered membership system"]
  }, {
    phase: "Phase 3: Ecosystem Growth",
    title: "Ecosystem Growth",
    status: "upcoming",
    items: ["Launch governance platform for voting", "Cross-chain bridge implementation", "Advanced analytics dashboard release", "Partnership with major e-commerce platforms"]
  }, {
    phase: "Phase 4: Mass Adoption",
    title: "Mass Adoption",
    status: "upcoming",
    items: ["Global payment processor integration", "Enterprise merchant solutions", "DeFi yield farming opportunities", "Worldwide community expansion"]
  }];
  const longTermVision = {
    technology: ["Layer 2 scaling solutions", "AI-powered trading tools", "Quantum-resistant security", "Advanced DeFi protocols"],
    globalExpansion: ["Worldwide merchant network", "Regional payment systems", "International partnerships", "Multi-language platform support"]
  };
  const faqs = [{
    question: "What is BIT Access?",
    answer: "BIT Access is a Web3 rewards platform that bridges traditional commerce with blockchain technology. Merchants accept USDT/USDC stablecoins for payments, and customers automatically earn BIT tokens as rewards for their purchases."
  }, {
    question: "How do I connect my wallet?",
    answer: 'Click the "Connect Wallet" button in the navigation bar and select your preferred wallet provider (MetaMask, Coinbase Wallet, WalletConnect, etc.). Follow the prompts to authorize the connection. Once connected, you\'ll be redirected to the dashboard.'
  }, {
    question: "What wallets are supported?",
    answer: "We support all major Web3 wallets including MetaMask, Coinbase Wallet, Trust Wallet, WalletConnect, and more through our Web3Modal integration. Any wallet compatible with BNB Chain can be used."
  }, {
    question: "How do I earn BIT tokens?",
    answer: "You earn BIT tokens automatically when you pay with USDT/USDC at participating merchants. Additionally, you can purchase BIT directly through DEX/CEX exchanges, participate in airdrops, join staking programs, or engage in community activities and bounty campaigns."
  }, {
    question: "What payment methods do merchants accept?",
    answer: "Merchants accept USDT and USDC stablecoins on BSC (BNB Chain). Support for Polygon, Base, and Arbitrum networks is planned for Q2 2026. Customers receive BIT tokens as rewards for their purchases."
  }, {
    question: "How does staking work?",
    answer: "You can lock your BIT tokens in one of three staking pools: 180 days (12% APY), 240 days (18% APY), or 365 days (25% APY). Rewards are calculated daily and distributed at maturity. The minimum staking amount is 1,000 BIT tokens."
  }, {
    question: "How do I become a merchant partner?",
    answer: "Visit the Dashboard and navigate to the Merchants Subscription tab. Choose a subscription plan (Starter at $99/month, Professional at $299/month, or Enterprise at $999/month) and complete the registration process. You'll receive integration support and marketing materials."
  }, {
    question: "What is the total supply of BIT tokens?",
    answer: "The total supply is 100,000,000,000 (100 billion) BIT tokens with 9 decimals. 10% of tokens have been burned, reducing the circulating supply. The token is deployed on BNB Chain (BSC) with contract address: 0xd3bde17ebd27739cf5505cd58ecf31cb628e469c."
  }, {
    question: "What are the transaction fees?",
    answer: "BIT token has a 3% buy tax and 3% sell tax. Transfer fees are 0%. The maximum total fee cap is 10% (buy + sell combined). Fees are used to support ecosystem development, marketing, and liquidity provision."
  }, {
    question: "Can I trade BIT tokens now?",
    answer: "BIT tokens will be listed on major DEX platforms (PancakeSwap, Uniswap) in Q1 2026, followed by CEX listings (Binance, KuCoin, etc.) in Q3 2026. Currently, tokens can be acquired through presale, airdrops, and P2P transactions."
  }, {
    question: "How do I claim airdrop tokens?",
    answer: "Visit the Dashboard and navigate to the Airdrop section. Connect your wallet and click 'Claim Airdrop' if you're eligible. Each wallet can claim 1,000 BIT tokens one time. Total airdrop supply is 10,000,000 BIT (0.01% of total supply)."
  }, {
    question: "What is the reward percentage for purchases?",
    answer: "Customers typically earn 1-5% of their purchase value in BIT tokens, depending on the merchant and promotion. Reward rates vary by merchant subscription tier and special campaigns. Check individual merchant pages for specific reward rates."
  }, {
    question: "How do I withdraw my staking rewards?",
    answer: "Staking rewards are automatically distributed to your wallet at the end of the staking period. You cannot withdraw rewards early. Once the lock period ends, both principal and rewards are released to your connected wallet address."
  }, {
    question: "Is BIT Access available in my country?",
    answer: "BIT Access is available globally with some restrictions. We comply with local regulations and may not be available in certain jurisdictions. Check our Terms of Service for restricted countries. The platform supports multiple languages for global accessibility."
  }, {
    question: "What are the merchant subscription benefits?",
    answer: "Merchants receive payment processing integration, customer rewards management, analytics dashboard, marketing materials, technical support, and access to our global customer network. Higher tiers include custom integrations and dedicated account managers."
  }, {
    question: "How secure is the BIT token smart contract?",
    answer: "The BIT token smart contract has undergone a comprehensive self-audit. It features non-upgradeable architecture, verified source code, reentrancy protection, no hidden backdoors, and transparent fee mechanics with hard-coded limits (max 5% buy/sell fee)."
  }, {
    question: "Can I lose my staked tokens?",
    answer: "No, staked tokens are securely locked in the smart contract and automatically returned to you at the end of the staking period along with rewards. However, you cannot withdraw early. Always ensure you're interacting with the official BIT Access staking contract."
  }, {
    question: "What happens if I lose access to my wallet?",
    answer: "BIT Access cannot recover lost wallets or private keys as we operate on a non-custodial model. Always backup your seed phrase securely. We recommend using hardware wallets for large amounts and never sharing your private keys with anyone."
  }, {
    question: "How does governance work?",
    answer: "BIT token holders can participate in community governance by voting on proposals related to platform development, fee adjustments, partnership decisions, and ecosystem initiatives. Voting power is proportional to token holdings. A DAO structure will be fully implemented in Q4 2026."
  }, {
    question: "What are the future roadmap milestones?",
    answer: "Key milestones include: DEX listing (Q1 2026), multi-chain expansion (Q2 2026), CEX listings (Q3 2026), enterprise API launch (Q4 2026), and long-term goals of Layer 2 scaling, AI-powered tools, and global merchant network expansion."
  }, {
    question: "How do I report bugs or security issues?",
    answer: "For security vulnerabilities, email security@bitaecosystem.org. For general bugs, contact support@bitaecosystem.org or join our Telegram community. We have a bug bounty program rewarding responsible disclosure of security issues."
  }, {
    question: "What is the token burning mechanism?",
    answer: "10% of total token supply has already been burned. The smart contract includes a burn function callable only by the owner. Additional token burns may occur based on community governance decisions to reduce circulating supply and increase scarcity."
  }, {
    question: "Can merchants set custom reward rates?",
    answer: "Yes, merchants can customize reward rates within guidelines based on their subscription tier. Professional and Enterprise merchants have more flexibility. Custom promotional campaigns can offer higher reward rates for limited periods to drive customer engagement."
  }, {
    question: "How do cross-border payments work?",
    answer: "BIT Access enables instant cross-border payments using stablecoins (USDT/USDC) without traditional banking intermediaries. Transactions settle in real-time on the blockchain with minimal fees, making international commerce accessible and affordable for all participants."
  }, {
    question: "What educational resources are available?",
    answer: "We offer comprehensive educational content including video tutorials on our YouTube channel, written guides in our documentation, community workshops, webinars for merchants, and incentive-based learning programs where you can earn BIT tokens while learning about blockchain."
  }, {
    question: "How do I contact customer support?",
    answer: "Contact us via email at support@bitaecosystem.org, join our Telegram community at t.me/bitaecosystemofficial, or follow us on Twitter @bitaecosystem. We also have a dedicated helpdesk portal with ticketing system for merchant partners."
  }, {
    question: "What makes BIT Access different from other reward platforms?",
    answer: "BIT Access uniquely combines real-world merchant adoption with blockchain rewards, using stablecoins for payments (reducing crypto volatility risk), offering generous staking APY up to 25%, and building a sustainable ecosystem with transparent tokenomics and community governance."
  }, {
    question: "Can I transfer BIT tokens between wallets?",
    answer: "Yes, BIT tokens are freely transferable between wallets with 0% transfer fee. Only buy and sell transactions (on DEX/CEX) incur the 3% tax. Ensure you're sending to a BNB Chain (BSC) compatible wallet address."
  }, {
    question: "How is liquidity managed?",
    answer: "10% of token allocation is dedicated to DEX liquidity and 10% to CEX liquidity. Liquidity is locked through reputable services like PinkLock to ensure stability. Market maker partnerships are being established for Q4 2025 to enhance trading depth and price stability."
  }, {
    question: "What is the roadmap for NFT marketplace integration?",
    answer: "NFT marketplace integration is planned for Q3 2025, enabling users to trade digital collectibles, merchant loyalty NFTs, and exclusive rewards using BIT tokens. This will create additional utility and engagement opportunities within the ecosystem."
  }];
  return <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Helpdesk</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Bit Access
          </p>
        </motion.div>

        <Tabs defaultValue="docs" className="max-w-7xl mx-auto" orientation="vertical">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto w-full bg-card border border-border p-2 gap-1 lg:sticky lg:top-24">
                <TabsTrigger value="whitepaper" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Whitepaper
                </TabsTrigger>
                <TabsTrigger value="tokenomics" className="w-full justify-start">
                  <PieChartIcon className="w-4 h-4 mr-2" />
                  Tokenomics
                </TabsTrigger>
                <TabsTrigger value="allocation" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Allocation
                </TabsTrigger>
                <TabsTrigger value="roadmap" className="w-full justify-start">
                  <Map className="w-4 h-4 mr-2" />
                  Roadmap
                </TabsTrigger>
                <TabsTrigger value="audit" className="w-full justify-start">
                  <FileCheck2 className="w-4 h-4 mr-2" />
                  Security Audit
                </TabsTrigger>
                <TabsTrigger value="direction" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Direction
                </TabsTrigger>
                <TabsTrigger value="faq" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="privacy" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="terms" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms
                </TabsTrigger>
                <TabsTrigger value="cookies" className="w-full justify-start">
                  <Cookie className="w-4 h-4 mr-2" />
                  Cookies
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {/* Whitepaper Tab */}
              <TabsContent value="whitepaper">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle className="text-3xl">BIT Access Whitepaper</CardTitle>
                            <CardDescription>
                              Comprehensive documentation of our vision, technology, and ecosystem
                            </CardDescription>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Evolution Section */}
                      {whitepaperSections.map((section, index) => <div key={index} className="pb-6 border-b border-border last:border-0">
                          <h3 className="text-2xl font-bold mb-4 text-primary">{section.title}</h3>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
                        </div>)}

                      {/* Introduction Section */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">1.0 Introduction</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.1 Overview of BIT Access</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The BIT Access Ecosystem is an innovative, decentralized platform designed to bridge the
                            gaps across industries such as e-commerce, education, and merchant services, offering a
                            seamless, tokenized, and efficient way for users to interact with digital content, engage in
                            transactions, and access services. The ecosystem is powered by BIT tokens, the native
                            utility token, and is underpinned by blockchain technology, ensuring that all transactions,
                            interactions, and data exchanges are transparent, secure, and verifiable.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.2 Industry Challenges and Opportunities</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access addresses key challenges in e-commerce (fragmented payment systems, customer
                            loyalty issues), education (high costs, lack of personalized learning), and merchant
                            services (high operational costs, limited financial inclusion). The ecosystem offers
                            opportunities through tokenized rewards, cross-border low-cost payments, decentralized
                            marketplaces, tokenized learning, and financial inclusion solutions.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">1.3 The BIT Access Solution</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The BIT Access Ecosystem provides solutions through decentralized finance, tokenized
                            education, and decentralized e-commerce. By eliminating intermediaries and leveraging
                            blockchain technology, BIT Access creates a more efficient, user-centric digital ecosystem
                            that empowers individuals and businesses alike.
                          </p>
                        </div>
                      </div>

                      {/* Mission, Vision, Values */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">2.0 Mission, Vision, and Values</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Mission Statement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              To create a decentralized ecosystem that empowers individuals, businesses, and educators
                              by leveraging blockchain technology to enhance digital transactions and value exchange.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Vision Statement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              To become a global leader in digital transformation across industries, creating a
                              transparent, secure, and decentralized digital economy.
                            </p>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">Core Values</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[{
                            title: "Innovation",
                            desc: "Commitment to continuous technological advancements"
                          }, {
                            title: "Decentralization",
                            desc: "Empowering users by removing centralized control"
                          }, {
                            title: "Integrity",
                            desc: "Maintaining transparency and ethical standards"
                          }, {
                            title: "Empowerment",
                            desc: "Supporting users with decentralized financial tools"
                          }, {
                            title: "Sustainability",
                            desc: "Building solutions for long-term growth"
                          }].map((value, idx) => <Card key={idx} className="bg-secondary/30">
                                <CardContent className="p-4">
                                  <h4 className="font-bold mb-2">{value.title}</h4>
                                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                                </CardContent>
                              </Card>)}
                          </div>
                        </div>
                      </div>

                      {/* BIT Access Ecosystem */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">3.0 The BIT Access Ecosystem</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.1 Decentralized E-Commerce Integration</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access enables secure, transparent transactions through blockchain, eliminating
                            intermediaries and reducing costs. Merchants benefit from payment systems with lower fees,
                            tokenized loyalty programs that increase customer retention, and the ability to tap into
                            global markets without currency conversion challenges.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.2 Education and Professional Development</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem offers decentralized learning platforms where educators can create and sell
                            courses while students access materials without traditional constraints. Blockchain
                            credentialing ensures achievements are verified and secure, while tokenized rewards
                            incentivize both learners and educators to engage and perform at their best.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.3 Tokenized Incentive and Rewards System</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT tokens function as the primary incentive within the ecosystem, rewarding consumers for
                            purchases and engagement, educators for quality content, and merchants for driving traffic
                            and transactions. Rebate programs, loyalty rewards, and community incentives promote
                            ecosystem growth and participation.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">3.4 Cross-Industry Innovation</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem facilitates cross-industry collaboration through interoperable blockchain
                            solutions, enabling value exchange across e-commerce, education, healthcare, entertainment,
                            and more. BIT tokens serve as a universal medium for transactions between different sectors,
                            creating new business models and opportunities.
                          </p>
                        </div>
                      </div>

                      {/* BIT Token */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">4.0 The BIT Token</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>4.1 Overview of BIT Token</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-semibold">Standard</p>
                                <p className="text-muted-foreground">BEP-20 (Binance Smart Chain)</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Max Supply</p>
                                <p className="text-muted-foreground">100,000,000,000 BIT</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Contract Address</p>
                                <p className="text-muted-foreground font-mono text-xs">
                                  0xd3bde17ebd27739cf5505cd58ecf31cb628e469c
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Transaction Tax</p>
                                <p className="text-muted-foreground">3% Buy / 3% Sell</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">4.2 Token Use Cases and Utility</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {["E-commerce purchases with lower fees", "Access to educational content", "Staking programs for passive income", "Liquidity provision rewards", "Merchant loyalty programs", "Customer engagement incentives"].map((use, idx) => <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{use}</span>
                              </div>)}
                          </div>
                        </div>
                      </div>

                      {/* Technology Infrastructure */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">6.0 Technology Infrastructure</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.1 Blockchain Platform and Security</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            BIT Access operates on the Binance Smart Chain (BSC) for its speed, low transaction costs,
                            and EVM compatibility.
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {["End-to-end encryption", "Multi-signature wallets", "Cryptographic hashing", "Decentralized consensus (DPoS)", "Regular security audits", "User data protection"].map((feature, idx) => <Card key={idx} className="bg-secondary/30">
                                <CardContent className="p-3 flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-sm">{feature}</span>
                                </CardContent>
                              </Card>)}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.2 Smart Contracts and DApps</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Smart contracts automate transactions, escrow services, rebate programs, and staking rewards
                            with transparency and security. DApps enable peer-to-peer transactions for e-commerce,
                            tokenized educational content delivery, and decentralized marketplaces.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">6.3 Scalability and Performance</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Layered architecture for modular expansion, with plans to implement sharding and Layer-2
                            solutions for improved throughput. Cross-chain compatibility ensures interoperability, while
                            performance optimizations include low latency transactions and dynamic fee structures.
                          </p>
                        </div>
                      </div>

                      {/* Market Strategy */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">7.0 Market Strategy and Growth</h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.1 Marketing and User Acquisition</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access employs airdrops, token incentives, referral programs, and influencer
                            partnerships to attract early adopters. Marketing strategies include social media
                            advertising, SEO/PPC campaigns, and content marketing, while conversion is optimized through
                            user education and continuous UX improvements.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.2 Global Expansion and Strategic Partnerships</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem will expand internationally through localized marketing campaigns and
                            establishing presence in key blockchain markets. Strategic partnerships with global
                            corporations, educational institutions, and cross-industry collaborations will drive token
                            integration across diverse sectors.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">7.3 Community Engagement</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Community growth is fostered through tokenized loyalty programs, regular airdrops, bounty
                            campaigns, active social media interaction, community events, and engagement with DeFi
                            communities.
                          </p>
                        </div>
                      </div>

                      {/* Legal & Compliance */}
                      <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">
                          9.0 Legal Considerations and Regulatory Compliance
                        </h2>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">9.1 Legal Framework</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            BIT Access operates within a robust legal framework including proper token classification as
                            a utility token, compliance with blockchain laws, adherence to data protection regulations
                            (GDPR/CCPA), AML/KYC procedures, intellectual property protections, and clear dispute
                            resolution mechanisms.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">9.2 Regulatory Compliance</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            The ecosystem maintains regulatory compliance across key markets including the US
                            (SEC/CFTC/FinCEN), EU (MiCA), UK (FCA), Asia-Pacific, and Latin America. It adheres to
                            international standards like FATF guidelines with regular audits and ongoing engagement with
                            regulators.
                          </p>
                        </div>
                      </div>

                      {/* Final Statements */}
                      <div className="space-y-6 pt-6 border-t border-border">
                        <h2 className="text-3xl font-bold text-primary">11.0 Final Statements</h2>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Summary of Benefits</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed">
                              BIT Access stands as a pioneering decentralized platform designed to revolutionize
                              e-commerce, education, and financial services through the power of blockchain technology.
                              Key benefits include:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 mt-4">
                              {["Decentralization & trustless transactions", "Tokenized incentive programs", "Scalability across industries", "Transparency & security", "Community-driven governance", "Global reach & partnerships"].map((benefit, idx) => <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </div>)}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                          <CardHeader>
                            <CardTitle>Call to Action</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              BIT Access invites you to be part of this revolutionary ecosystem. Whether you're looking
                              to invest, stake, or become a part of the growing decentralized economy, this is your
                              opportunity to join a transformative platform.
                            </p>
                            <p className="text-muted-foreground leading-relaxed font-semibold">
                              Join BIT Access today, and be a part of the future!
                            </p>
                          </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold">Contact Us</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Website</p>
                                    <a href="https://bitaecosystem.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm break-all">
                                      https://bitaecosystem.org
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Email</p>
                                    <a href="mailto:support@bitaecosystem.org" className="text-primary hover:underline text-sm break-all">
                                      support@bitaecosystem.org
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Facebook className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Facebook</p>
                                    <a href="https://www.facebook.com/bitaecosystemofficial" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Twitter className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Twitter</p>
                                    <a href="https://x.com/bitaecosystem" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                      @bitaecosystem
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">Telegram</p>
                                    <a href="https://t.me/bitaecosystemofficial" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-semibold">GitHub</p>
                                    <a href="https://www.github.com/bitaecosystemofficial" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                      @bitaecosystemofficial
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Tokenomics Tab */}
              <TabsContent value="tokenomics">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <PieChartIcon className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Token Distribution & Allocation</CardTitle>
                          <CardDescription>
                            The BIT Token Distribution and Allocation outlines the planned distribution of the BIT
                            tokens to ensure a balanced, fair, and sustainable ecosystem.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* Main Applications */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-2 text-primary">Main Applications</h3>
                        <p className="text-muted-foreground">Business, E-commerce & Community Services</p>
                      </div>

                      {/* Token Usage */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">Token Usage</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tokenUsage.map((item, index) => <Card key={index} className="bg-secondary/30 border-border hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <item.icon className="w-8 h-8 text-primary mb-2" />
                                <h4 className="font-bold mb-1">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </CardContent>
                            </Card>)}
                        </div>
                      </div>

                      {/* Ecosystem Benefits */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary">BIT Rewards Ecosystem</h3>
                        <p className="text-muted-foreground mb-6">
                          Earn BIT tokens as rewards - Payments processed via USDT/USDC on 4 networks
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Token Holders */}
                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                                <Users className="w-6 h-6" />
                                For Token Holders
                              </h4>
                              <ul className="space-y-2">
                                {tokenHolderBenefits.map((benefit, idx) => <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>

                          {/* Community */}
                          <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-border">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                                <Gift className="w-6 h-6" />
                                For the Community
                              </h4>
                              <ul className="space-y-2">
                                {communityBenefits.map((benefit, idx) => <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>

                          {/* Customers */}
                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-border">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                                <Users className="w-6 h-6" />
                                For Customers
                              </h4>
                              <ul className="space-y-2">
                                {customerBenefits.map((benefit, idx) => <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>

                          {/* Merchants */}
                          <Card className="bg-gradient-to-br from-secondary/50 to-secondary/30 border-border">
                            <CardContent className="p-6">
                              <h4 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                                <Coins className="w-6 h-6" />
                                For Merchants
                              </h4>
                              <ul className="space-y-2">
                                {merchantBenefits.map((benefit, idx) => <li key={idx} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-primary">Key Metrics</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Token Name:</span>
                              <span className="font-bold">Bit Access (BIT)</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Total Supply:</span>
                              <span className="font-bold text-primary">100,000,000,000 BIT</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Decimals:</span>
                              <span className="font-bold text-primary">9</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Initial Price:</span>
                              <span className="font-bold">$0.00108 USDT/USDC</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Token Type:</span>
                              <span className="font-bold">Reward Token (BEP-20)</span>
                            </div>
                            <div className="flex justify-between p-3 bg-secondary/30 rounded">
                              <span className="text-muted-foreground">Burn Mechanism:</span>
                              <span className="font-bold text-green-400">Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-primary">Staking APY</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between p-3 bg-gradient-to-r from-blue-500/20 to-blue-500/5 rounded border border-blue-500/30">
                              <span className="font-bold">180 Days Lock:</span>
                              <span className="font-bold text-blue-400">12% APY</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-purple-500/20 to-purple-500/5 rounded border border-purple-500/30">
                              <span className="font-bold">240 Days Lock:</span>
                              <span className="font-bold text-purple-400">18% APY</span>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded border border-primary/30">
                              <span className="font-bold">365 Days Lock:</span>
                              <span className="font-bold text-primary">25% APY</span>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                            <h4 className="font-bold mb-2">Deflationary Model</h4>
                            <p className="text-sm text-muted-foreground">
                              0.5% of every transaction is burned, reducing total supply over time and increasing
                              scarcity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Token & Fund Allocation Tab */}
              <TabsContent value="allocation">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Token Distribution */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Token Distribution</CardTitle>
                        <CardDescription>Distribution of 100M BIT tokens</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie data={tokenAllocationData} cx="50%" cy="50%" labelLine={false} outerRadius={90} fill="#8884d8" dataKey="value">
                              {tokenAllocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip formatter={value => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-1.5 max-h-64 overflow-y-auto">
                          {tokenAllocationData.map((item, index) => <div key={index} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded mr-2 flex-shrink-0" style={{
                              backgroundColor: item.color
                            }} />
                                <span className="text-xs">{item.name}</span>
                              </div>
                              <span className="font-bold text-xs">{item.value}%</span>
                            </div>)}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Funding Allocation */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-2xl">Funding Allocation</CardTitle>
                        <CardDescription>How raised funds will be used</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie data={fundAllocationData} cx="50%" cy="50%" labelLine={false} outerRadius={90} fill="#8884d8" dataKey="value">
                              {fundAllocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip formatter={value => `${value}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-1.5 max-h-64 overflow-y-auto">
                          {fundAllocationData.map((item, index) => <div key={index} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded mr-2 flex-shrink-0" style={{
                              backgroundColor: item.color
                            }} />
                                <span className="text-xs">{item.name}</span>
                              </div>
                              <span className="font-bold text-xs">{item.value}%</span>
                            </div>)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Roadmap Tab */}
              <TabsContent value="roadmap">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }} className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Map className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Roadmap</CardTitle>
                          <CardDescription>BIT Access development timeline to 2026 and beyond</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {roadmapPhases.map((phase, index) => {
                        const statusConfig = {
                          completed: {
                            icon: CheckCircle,
                            color: "text-green-500",
                            bg: "bg-green-500",
                            border: "border-green-500"
                          },
                          current: {
                            icon: Clock,
                            color: "text-primary",
                            bg: "bg-primary",
                            border: "border-primary"
                          },
                          upcoming: {
                            icon: Circle,
                            color: "text-muted-foreground",
                            bg: "bg-muted-foreground",
                            border: "border-muted-foreground"
                          }
                        };
                        const config = statusConfig[phase.status as keyof typeof statusConfig];
                        const StatusIcon = config.icon;
                        return <motion.div key={index} initial={{
                          opacity: 0,
                          x: -20
                        }} whileInView={{
                          opacity: 1,
                          x: 0
                        }} transition={{
                          delay: index * 0.1
                        }} viewport={{
                          once: true
                        }} className={`relative pl-8 border-l-2 ${phase.status === "current" ? "border-primary" : phase.status === "completed" ? "border-green-500" : "border-muted-foreground/30"}`}>
                              <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full ${config.bg} border-4 border-background flex items-center justify-center`}>
                                <StatusIcon className="w-3 h-3 text-background" />
                              </div>
                              <div className={`pb-8 ${phase.status === "current" ? "bg-primary/5 -ml-4 pl-8 pr-4 py-4 rounded-lg border border-primary/20" : ""}`}>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className={`text-sm font-mono ${config.color} font-bold px-2 py-1 rounded ${phase.status === "completed" ? "bg-green-500/10" : phase.status === "current" ? "bg-primary/10" : "bg-muted/30"}`}>
                                    {phase.phase}
                                  </span>
                                  <h3 className="text-2xl font-bold">{phase.title}</h3>
                                  {phase.status === "completed" && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full font-semibold">
                                      ✓ Completed
                                    </span>}
                                  {phase.status === "current" && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-semibold">
                                      ● Current Phase
                                    </span>}
                                  {phase.status === "upcoming" && <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-semibold">
                                      Upcoming
                                    </span>}
                                </div>
                                <ul className="space-y-2 mt-4">
                                  {phase.items.map((item, idx) => <li key={idx} className="flex items-start">
                                      {phase.status === "completed" ? <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" /> : phase.status === "current" ? <div className="w-4 h-4 mr-2 mt-1 flex-shrink-0 rounded-full border-2 border-primary flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div> : <Circle className="w-4 h-4 text-muted-foreground mr-2 mt-1 flex-shrink-0" />}
                                      <span className={phase.status === "completed" ? "text-muted-foreground" : ""}>
                                        {item}
                                      </span>
                                    </li>)}
                                </ul>
                              </div>
                            </motion.div>;
                      })}
                      </div>

                      {/* Long-term Vision Section */}
                      <div className="mt-12 pt-8 border-t border-border">
                        <h3 className="text-3xl font-bold mb-4 flex items-center gap-2">
                          <Rocket className="w-8 h-8 text-primary" />
                          Beyond 2026
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Our long-term vision extends beyond 2026 as we continue to innovate and expand the BIT Access
                          ecosystem:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Rocket className="w-6 h-6 text-primary" />
                                Technology Innovation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {longTermVision.technology.map((item, idx) => <li key={idx} className="flex items-start">
                                    <TrendingUp className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Globe className="w-6 h-6 text-primary" />
                                Global Expansion
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {longTermVision.globalExpansion.map((item, idx) => <li key={idx} className="flex items-start">
                                    <TrendingUp className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                  </li>)}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Security Audit Tab */}
              <TabsContent value="audit">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                          <FileCheck2 className="w-8 h-8 text-primary" />
                          <div>
                            <CardTitle className="text-3xl">Security Self-Audit</CardTitle>
                            <CardDescription>Our commitment to security and transparency.</CardDescription>
                          </div>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Download className="w-4 h-4 mr-2" />
                          Download as PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Audit Summary */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Shield className="w-6 h-6" />
                          Audit Summary
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Contract Name</span>
                              <span className="text-primary font-mono">BITACCESSTOKEN</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Token Symbol</span>
                              <span className="text-primary font-mono">BIT</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Blockchain</span>
                              <span className="text-muted-foreground">BNB Chain</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Network</span>
                              <span className="text-muted-foreground">Mainnet / Testnet auto-detection</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Total Supply</span>
                              <span className="text-primary">100,000,000,000 BIT</span>
                            </div>
                            <div className="flex justify-between items-start text-sm">
                              <span className="text-muted-foreground"></span>
                              <span className="text-muted-foreground font-mono">1e11 * 10⁹</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Decimals</span>
                              <span className="text-muted-foreground">9</span>
                            </div>
                            <div className="flex justify-between items-start text-sm">
                              <span className="text-muted-foreground"></span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Verified Source Code</span>
                              <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Yes - Fully verified
                              </span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="font-semibold">Proxy Used</span>
                              <span className="text-muted-foreground">Non-Upgradeability</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security & Safety Features */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <CheckCircle className="w-6 h-6" />
                          Security & Safety Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[{
                          feature: "Ownership Control",
                          status: "Yes",
                          note: "Secure, with owner functions gated"
                        }, {
                          feature: "Hidden Owner/Backdoor",
                          status: "None found",
                          note: "No hidden ownership mechanisms"
                        }, {
                          feature: "Blacklist/Whitelist",
                          status: "Whitelist present",
                          note: "Some addresses can be excluded from fees"
                        }, {
                          feature: "Self-Destruct",
                          status: "Not found",
                          note: "Cannot be destroyed"
                        }, {
                          feature: "Burn Functionality",
                          status: "Yes",
                          note: "Only callable by owner"
                        }, {
                          feature: "Gas Efficiency",
                          status: "No abuse found",
                          note: ""
                        }, {
                          feature: "Proxy/Upgradeable",
                          status: "No proxy used",
                          note: ""
                        }, {
                          feature: "Reentrancy",
                          status: "Protected",
                          note: "On airdrop & swap functions"
                        }, {
                          feature: "Tax Adjustable",
                          status: "Yes",
                          note: "Buy/sell tax adjustable by owner"
                        }, {
                          feature: "Anti-Whale",
                          status: "None",
                          note: "Unlimited transfers allowed"
                        }, {
                          feature: "Trading Lock",
                          status: "Yes",
                          note: "Trading cannot begin until enabled"
                        }, {
                          feature: "Blacklist Risk",
                          status: "None",
                          note: "No blacklist function present"
                        }, {
                          feature: "Cooldown Mechanism",
                          status: "None",
                          note: ""
                        }].map((item, idx) => <Card key={idx} className="bg-secondary/30 border-border">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-sm">{item.feature}</span>
                                  <span className="text-primary text-sm font-mono">{item.status}</span>
                                </div>
                                {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                              </CardContent>
                            </Card>)}
                        </div>
                      </div>

                      {/* Tokenomics & Fee Mechanics */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Coins className="w-6 h-6" />
                          Tokenomics & Fee Mechanics
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="bg-secondary/30 border-border">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="font-semibold">Initial Fees</span>
                                <span className="text-primary">3% Buy / 3% Sell / 0% Transfer</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Fee Receiver</span>
                                <span className="text-muted-foreground text-sm">feeReceiver address</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Can be updated by owner</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Max Buy Fee</span>
                                <span className="text-primary">5%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Hard limit enforced</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Max Sell Fee</span>
                                <span className="text-primary">5%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Hard limit enforced</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-secondary/30 border-border">
                            <CardContent className="p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="font-semibold">Total Fee Cap</span>
                                <span className="text-primary">10%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Buy + Sell must be ≤ 10%</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Excluded From Fees</span>
                                <span className="text-muted-foreground text-sm">Owner, contract, dead, PinkLock</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold">Swap Threshold</span>
                                <span className="text-muted-foreground text-sm">swapTokensAtAmount</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Initially 0.02% of total supply</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Swap for ETH</span>
                                <span className="text-green-500">Yes</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Fee tokens swapped for ETH via DEX</p>
                              <div className="flex justify-between">
                                <span className="font-semibold">Manual Swap</span>
                                <span className="text-muted-foreground">Not exposed</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Swap handled automatically</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Airdrop System */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Gift className="w-6 h-6" />
                          Airdrop System
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Total Airdrop Supply</span>
                                  <span className="text-primary">10,000,000 BIT</span>
                                </div>
                                <p className="text-xs text-muted-foreground">0.01% of total</p>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Claimable Per Wallet</span>
                                  <span className="text-primary">1,000 BIT</span>
                                </div>
                                <p className="text-xs text-muted-foreground">One-time claim</p>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Airdrop Wallet</span>
                                  <span className="text-muted-foreground">Configurable</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Initially owner</p>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Claim Limits</span>
                                  <span className="text-green-500">Enforced</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Can't exceed total, non-reentrant</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Holders & Distribution Risk */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Users className="w-6 h-6" />
                          Holders & Distribution Risk
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Top 10 Holders Control</span>
                              <span className="text-orange-500 font-bold">92% of supply</span>
                            </div>
                            <p className="text-sm text-orange-400">⚠️ This is extremely centralized.</p>
                            <div className="flex justify-between">
                              <span className="font-semibold">Burned Tokens</span>
                              <span className="text-primary">10% sent to 0x...dead address</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* DEX & Liquidity */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <Repeat className="w-6 h-6" />
                          DEX & Liquidity
                        </h3>
                        <Card className="bg-secondary/30 border-border">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Router Supported</span>
                                  <span className="text-primary">PancakeSwap (BSC)</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-semibold">Pair Created</span>
                                  <span className="text-green-500">N/A (BIT/WBNB)</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="font-semibold">Liquidity Lock?</span>
                                  <span className="text-muted-foreground text-sm">Not verified in code</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  May depend on third-party locker (e.g., PinkLock)
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Risks / Considerations */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <AlertTriangle className="w-6 h-6" />
                          Risks / Considerations
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[{
                          risk: "Owner Controls Fees",
                          level: "Medium",
                          note: "Tax can be increased within limits (5% max each)"
                        }, {
                          risk: "Centralized Holdings",
                          level: "High",
                          note: "Top 5 holders = 70%+"
                        }, {
                          risk: "Whitelist Present",
                          level: "Medium",
                          note: "Some addresses may avoid fees"
                        }, {
                          risk: "Trading Lock Risk",
                          level: "Low",
                          note: "Owner must manually enable trading"
                        }, {
                          risk: "Swap Failure Handling",
                          level: "Safe",
                          note: "Swap errors are caught and logged, not reverted"
                        }, {
                          risk: "Mint Functionality",
                          level: "Controlled",
                          note: "Only internal minting, e.g., airdrop"
                        }].map((item, idx) => <Card key={idx} className={`border-border ${item.level === "High" ? "bg-red-500/10 border-red-500/30" : item.level === "Medium" ? "bg-orange-500/10 border-orange-500/30" : item.level === "Low" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-green-500/10 border-green-500/30"}`}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="font-semibold text-sm">{item.risk}</span>
                                  <span className={`text-sm font-bold ${item.level === "High" ? "text-red-500" : item.level === "Medium" ? "text-orange-500" : item.level === "Low" ? "text-yellow-500" : "text-green-500"}`}>
                                    {item.level}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.note}</p>
                              </CardContent>
                            </Card>)}
                        </div>
                      </div>

                      {/* Verdict */}
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                          <CheckCircle className="w-6 h-6" />
                          Verdict
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="font-bold">Security:</span>
                              <span className="text-green-500">✅ Well-structured</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Secure ERC20 with trading protection and no critical vulnerabilities found.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="font-bold">Functionality:</span>
                              <span className="text-green-500">✅ Full support</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              Complete support for fees, liquidity, and airdrops.
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-orange-500" />
                              <span className="font-bold">⚠️ Caution Points:</span>
                            </div>
                            <ul className="text-sm text-muted-foreground ml-7 space-y-1 list-disc list-inside">
                              <li>High token centralization among top holders.</li>
                              <li>Owner can adjust transaction taxes (within limits).</li>
                              <li>Whitelist allows exemptions.</li>
                            </ul>
                          </div>
                          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl font-bold text-orange-500">7/10</span>
                              <div>
                                <h4 className="font-bold text-orange-500">🟡 Moderate Risk</h4>
                                <p className="text-sm text-muted-foreground">Final Audit Rating</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                              <strong>Reason:</strong> While the contract is generally secure and transparent, the
                              extremely high concentration of token supply and whitelist flexibility introduce potential
                              manipulation or dumping risks, especially post-launch. Investors should monitor wallet
                              activity and ensure liquidity is locked before investing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Project Direction Tab */}
              <TabsContent value="direction">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Target className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="text-3xl">Project Direction</CardTitle>
                          <CardDescription>Our vision for the future of Web3 rewards</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-2xl font-bold text-primary mb-4">Mission Statement</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          To bridge traditional commerce with Web3 technology by creating a reward ecosystem where
                          merchants accept stablecoins (USDT/USDC) for payments and customers earn BIT tokens, fostering
                          adoption and creating value for all participants.
                        </p>

                        <h3 className="text-2xl font-bold text-primary mb-4">Strategic Goals</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">Merchant Adoption</h4>
                            <p className="text-sm text-muted-foreground">
                              Onboard 10,000+ merchants globally by end of 2025, focusing on retail, hospitality, and
                              e-commerce sectors.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">User Growth</h4>
                            <p className="text-sm text-muted-foreground">
                              Reach 500,000 active users earning and staking BIT rewards through merchant partnerships
                              worldwide.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">Multi-Chain Expansion</h4>
                            <p className="text-sm text-muted-foreground">
                              Launch on Polygon, Base, and Arbitrum to provide users with flexible, low-cost transaction
                              options.
                            </p>
                          </div>
                          <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                            <h4 className="font-bold text-lg mb-2">DeFi Integration</h4>
                            <p className="text-sm text-muted-foreground">
                              Integrate with major DeFi protocols for enhanced liquidity and yield opportunities for BIT
                              holders.
                            </p>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-primary mb-4">Long-Term Vision</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          BIT Access aims to become the leading Web3 rewards platform, where cryptocurrency payments are
                          as common as traditional card payments. We envision a future where:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                          <li>Every merchant accepts stablecoins for instant, secure settlements</li>
                          <li>Customers automatically earn valuable BIT rewards with every purchase</li>
                          <li>Community governance shapes platform development through DAO mechanisms</li>
                          <li>Cross-border payments are seamless, fast, and cost-effective</li>
                          <li>BIT tokens provide real utility beyond speculation, driving ecosystem growth</li>
                        </ul>

                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-6">
                          <h3 className="text-2xl font-bold mb-3">Join Our Journey</h3>
                          <p className="text-muted-foreground">
                            Whether you're a merchant looking to accept crypto payments, a customer wanting to earn
                            rewards, or an investor believing in Web3's future, BIT Access offers opportunities for
                            everyone to participate in the decentralized economy.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-semibold">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>)}
                      </Accordion>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Privacy Policy Tab */}
              <TabsContent value="privacy">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Shield className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <p className="text-sm text-muted-foreground mb-6">
                        <strong>Last Updated:</strong> January 2025
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">1. Introduction</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our decentralized Web3 rewards platform. Please read this privacy policy carefully.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">2. Information We Collect</h3>
                      <p className="text-muted-foreground mb-4">
                        We collect minimal data necessary to provide our services:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li><strong>Blockchain Data:</strong> Wallet addresses, transaction hashes, token balances, and smart contract interactions are stored on the blockchain and are publicly accessible</li>
                        <li><strong>Technical Data:</strong> IP addresses, browser type, device information, and usage analytics to improve our platform</li>
                        <li><strong>Merchant Information:</strong> Business name, contact details, and payment preferences for merchant partners</li>
                        <li><strong>Communication Data:</strong> Email addresses and messages when you contact our support team</li>
                        <li><strong>Cookies and Tracking:</strong> Session data, preferences, and analytics through cookies (see our Cookie Policy)</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">3. How We Use Your Information</h3>
                      <p className="text-muted-foreground mb-4">
                        Your data is used solely to facilitate transactions and improve our services:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Processing BIT token transactions and rewards distribution</li>
                        <li>Managing staking programs and calculating APY rewards</li>
                        <li>Facilitating merchant-customer payment transactions</li>
                        <li>Providing customer support and responding to inquiries</li>
                        <li>Improving platform features and user experience</li>
                        <li>Sending important updates about the platform (you can opt-out of marketing)</li>
                        <li>Detecting and preventing fraud, security breaches, and technical issues</li>
                        <li>Complying with legal obligations and regulatory requirements</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">4. Data Sharing and Disclosure</h3>
                      <p className="text-muted-foreground mb-4">
                        We never sell your personal information to third parties. We may share data in limited circumstances:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li><strong>Blockchain Network:</strong> All on-chain transactions are publicly visible on the BNB Chain blockchain</li>
                        <li><strong>Service Providers:</strong> Third-party analytics tools (Google Analytics) and infrastructure providers</li>
                        <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                        <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (you will be notified)</li>
                        <li><strong>With Your Consent:</strong> Any other sharing will require your explicit permission</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">5. Security Measures</h3>
                      <p className="text-muted-foreground mb-4">
                        We employ industry-standard security measures to protect your data:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>All sensitive operations are executed on-chain with cryptographic verification</li>
                        <li>SSL/TLS encryption for all data transmitted to and from our platform</li>
                        <li>Regular security audits of our smart contracts and infrastructure</li>
                        <li>Multi-signature wallets for managing platform funds</li>
                        <li>Access controls and authentication mechanisms for administrative functions</li>
                        <li>Regular backups and disaster recovery procedures</li>
                        <li>Employee training on data protection and security best practices</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">6. Data Retention</h3>
                      <p className="text-muted-foreground mb-6">
                        We retain your information only as long as necessary to provide services and comply with legal obligations. Blockchain data is permanent and immutable. Off-chain data (emails, analytics) is retained for 2 years or until you request deletion. Merchant account data is kept for 5 years for regulatory compliance.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">7. Your Privacy Rights</h3>
                      <p className="text-muted-foreground mb-4">
                        You have the following rights regarding your data:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                        <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                        <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                        <li><strong>Object:</strong> Object to processing of your data for certain purposes</li>
                        <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                      </ul>
                      <p className="text-muted-foreground mb-6">
                        To exercise these rights, contact our support team at support@bitaecosystem.org. We will respond within 30 days.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">8. International Data Transfers</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access operates globally. Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place when transferring data internationally, including compliance with GDPR for EU users and adherence to data protection frameworks.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">9. Children's Privacy</h3>
                      <p className="text-muted-foreground mb-6">
                        Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected data from a child, we will delete it immediately. Parents who believe their child has provided information should contact us.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">10. Third-Party Links</h3>
                      <p className="text-muted-foreground mb-6">
                        Our platform may contain links to third-party websites, including DEX platforms, wallets, and merchant sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">11. Analytics and Tracking</h3>
                      <p className="text-muted-foreground mb-6">
                        We use analytics tools (Google Analytics, blockchain explorers) to understand how users interact with our platform. This helps us improve features and user experience. You can opt-out of analytics tracking through your browser settings or privacy tools.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">12. Marketing Communications</h3>
                      <p className="text-muted-foreground mb-6">
                        We may send you promotional emails about new features, special offers, and ecosystem updates. You can unsubscribe at any time by clicking the unsubscribe link in emails or contacting support. Transactional emails (security alerts, transaction confirmations) cannot be opted out of.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">13. Data Breach Notification</h3>
                      <p className="text-muted-foreground mb-6">
                        In the unlikely event of a data breach that affects your personal information, we will notify you within 72 hours via email and provide details about the breach, potential impact, and steps we're taking to address it. We will also report to relevant regulatory authorities as required by law.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">14. California Privacy Rights (CCPA)</h3>
                      <p className="text-muted-foreground mb-6">
                        California residents have additional rights under CCPA including the right to know what personal information is collected, the right to delete personal information, the right to opt-out of sale of personal information, and the right to non-discrimination for exercising privacy rights. We do not sell personal information.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">15. GDPR Compliance (EU Users)</h3>
                      <p className="text-muted-foreground mb-6">
                        For users in the European Economic Area, we comply with GDPR requirements including lawful basis for processing (consent, contract, legitimate interest), data minimization, purpose limitation, and the appointment of a Data Protection Officer where required. Contact dpo@bitaecosystem.org for GDPR-related inquiries.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">16. Automated Decision Making</h3>
                      <p className="text-muted-foreground mb-6">
                        We do not use automated decision-making or profiling that produces legal effects or similarly significantly affects you. Automated processes (like reward calculations) are transparent and based on predetermined algorithms outlined in our documentation.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">17. Changes to Privacy Policy</h3>
                      <p className="text-muted-foreground mb-6">
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be communicated via email or platform notification. Continued use of our services after changes constitutes acceptance of the updated policy.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">18. Contact Information</h3>
                      <p className="text-muted-foreground mb-6">
                        For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> support@bitaecosystem.org<br />
                        <strong>Data Protection Officer:</strong> dpo@bitaecosystem.org<br />
                        <strong>Website:</strong> https://bitaecosystem.org<br />
                        <strong>Telegram:</strong> @bitaecosystemofficial
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">19. Regulatory Compliance</h3>
                      <p className="text-muted-foreground mb-6">
                        We strive to comply with all applicable data protection laws including GDPR (Europe), CCPA (California), LGPD (Brazil), and other regional regulations. We work with legal advisors to ensure ongoing compliance as regulations evolve.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">20. Your Consent</h3>
                      <p className="text-muted-foreground">
                        By using BIT Access platform, you consent to this Privacy Policy and agree to its terms. If you do not agree, please discontinue use of our services. You can withdraw consent at any time by contacting us, though this may limit your ability to use certain features.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Terms of Use Tab */}
              <TabsContent value="terms">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Terms of Use</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <p className="text-sm text-muted-foreground mb-6">
                        <strong>Last Updated:</strong> January 2025
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">1. Acceptance of Terms</h3>
                      <p className="text-muted-foreground mb-6">
                        By accessing and using BIT Access platform, website, services, or purchasing BIT tokens, you accept and agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not use our services. These Terms constitute a legally binding agreement between you and BIT Access.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">2. Eligibility</h3>
                      <p className="text-muted-foreground mb-6">
                        You must be at least 18 years old and legally capable of entering into binding contracts to use BIT Access. By using our services, you represent and warrant that you meet these requirements. Users from restricted jurisdictions (as outlined in Section 19) are prohibited from using our platform.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">3. User Responsibilities</h3>
                      <p className="text-muted-foreground mb-4">
                        Users are responsible for:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Maintaining the security of their wallets, private keys, and seed phrases</li>
                        <li>All transactions made from their connected wallet addresses</li>
                        <li>Ensuring compliance with local laws and regulations</li>
                        <li>Providing accurate information when registering as a merchant</li>
                        <li>Paying applicable taxes on token earnings and transactions</li>
                        <li>Not engaging in fraudulent, abusive, or illegal activities</li>
                        <li>Protecting their account credentials and not sharing with others</li>
                        <li>Verifying transaction details before confirming on blockchain</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">4. Account Security</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access operates on a non-custodial model. We do not have access to your private keys or wallet funds. You are solely responsible for securing your wallet. BIT Access is not liable for losses due to compromised wallets, lost private keys, phishing attacks, or user negligence. Always verify you're interacting with official BIT Access contracts and websites.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">5. Token Usage and Classification</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT tokens are utility tokens designed for use within our ecosystem. They are not securities and do not represent ownership, equity, or investment in BIT Access company. BIT tokens provide access to platform features including rewards programs, staking, merchant payments, and governance participation. Token value may fluctuate and past performance does not guarantee future results.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">6. Prohibited Activities</h3>
                      <p className="text-muted-foreground mb-4">
                        Users are prohibited from:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Using the platform for money laundering, terrorism financing, or illegal activities</li>
                        <li>Attempting to manipulate token prices or engage in market manipulation</li>
                        <li>Creating multiple accounts to abuse airdrop or reward systems</li>
                        <li>Reverse engineering, decompiling, or extracting source code</li>
                        <li>Using bots, scripts, or automated tools to exploit the platform</li>
                        <li>Impersonating BIT Access team members or official accounts</li>
                        <li>Distributing malware, viruses, or harmful code</li>
                        <li>Interfering with platform operations or security features</li>
                        <li>Violating intellectual property rights</li>
                        <li>Spamming, phishing, or sending unsolicited communications</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">7. Merchant Terms</h3>
                      <p className="text-muted-foreground mb-6">
                        Merchants must maintain active subscription payments, provide accurate business information, comply with local payment processing regulations, honor advertised reward rates to customers, and maintain adequate product/service quality. BIT Access reserves the right to suspend merchant accounts for violations, fraud, or excessive customer complaints. Subscription fees are non-refundable.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">8. Staking Terms</h3>
                      <p className="text-muted-foreground mb-6">
                        Staking programs lock your tokens for specified periods (180, 240, or 365 days). You cannot withdraw tokens or rewards before the lock period ends. APY rates (12%, 18%, 25%) are estimates and may vary based on network conditions. Rewards are calculated daily and distributed at maturity. Minimum staking amount is 1,000 BIT tokens. Unstaking early is not permitted.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">9. Transaction Fees</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT token transactions on DEX/CEX incur a 3% buy tax and 3% sell tax. Wallet-to-wallet transfers have 0% fee. Fees support ecosystem development, marketing, and liquidity. Maximum total fee is capped at 10% (buy + sell combined) and enforced by smart contract. Additional blockchain gas fees apply for all transactions and are paid in BNB (on BSC).
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">10. Intellectual Property</h3>
                      <p className="text-muted-foreground mb-6">
                        All content, logos, trademarks, code, and materials on BIT Access platform are owned by BIT Access or licensed to us. You may not copy, reproduce, distribute, or create derivative works without written permission. The BIT Access name, logo, and branding are protected trademarks. Unauthorized use may result in legal action.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">11. Disclaimer of Warranties</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or secure. We do not guarantee token value, trading prices, or investment returns. Smart contract functionality is provided without warranty.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">12. Limitation of Liability</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access and its team members are not liable for any indirect, incidental, special, consequential, or punitive damages arising from use of our platform including token value loss, failed transactions, smart contract bugs, exchange hacks, regulatory changes, or market volatility. Our maximum liability is limited to the amount you paid for services in the past 6 months.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">13. Indemnification</h3>
                      <p className="text-muted-foreground mb-6">
                        You agree to indemnify, defend, and hold harmless BIT Access, its officers, directors, employees, and partners from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the platform, violation of these Terms, or infringement of third-party rights.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">14. Privacy and Data Protection</h3>
                      <p className="text-muted-foreground mb-6">
                        Your use of BIT Access is also governed by our Privacy Policy. We collect and process data as described in the Privacy Policy. By using our services, you consent to data collection and processing. Blockchain transactions are public and permanent.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">15. Regulatory Compliance</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access strives to comply with applicable laws and regulations. However, cryptocurrency regulations are evolving. Users are responsible for understanding and complying with laws in their jurisdiction. We may implement KYC/AML procedures as required by regulations. Failure to provide required information may result in service restrictions.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">16. Tax Obligations</h3>
                      <p className="text-muted-foreground mb-6">
                        You are solely responsible for determining and paying all applicable taxes related to BIT token transactions, staking rewards, and platform usage. BIT Access does not provide tax advice. Consult with a tax professional regarding your obligations. We may report transaction information to tax authorities as required by law.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">17. Platform Changes and Updates</h3>
                      <p className="text-muted-foreground mb-6">
                        We reserve the right to modify, suspend, or discontinue any part of the platform at any time without notice. Features, services, and reward rates may change. Smart contracts are non-upgradeable, but platform interfaces and services may be updated. We will communicate material changes via email or platform announcements.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">18. Termination</h3>
                      <p className="text-muted-foreground mb-6">
                        We may terminate or suspend your access to the platform immediately, without notice, for violations of these Terms, suspicious activity, legal requirements, or at our discretion. Upon termination, your right to use the platform ceases. Blockchain-based holdings remain accessible through your wallet. Merchant subscription fees are non-refundable upon termination.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">19. Geographic Restrictions</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access may not be available in all countries. Services are restricted in jurisdictions where cryptocurrency activities are prohibited. Currently restricted regions include: North Korea, Iran, Syria, Cuba, and regions under international sanctions. Users must comply with local laws. Accessing the platform through VPNs to circumvent restrictions is prohibited.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">20. Third-Party Services</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access integrates with third-party services including wallets (MetaMask, WalletConnect), DEX platforms (PancakeSwap, Uniswap), and blockchain explorers. We are not responsible for third-party services, their functionality, security, or terms. Review their terms before use.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">21. Dispute Resolution</h3>
                      <p className="text-muted-foreground mb-6">
                        Any disputes arising from these Terms or platform use will be resolved through binding arbitration rather than court litigation. Arbitration will be conducted under internationally recognized arbitration rules. You waive the right to participate in class actions. Small claims court remains available for qualifying disputes.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">22. Governing Law</h3>
                      <p className="text-muted-foreground mb-6">
                        These Terms are governed by and construed in accordance with international commercial law principles. For users in specific jurisdictions, local consumer protection laws may apply. Choice of law does not override mandatory consumer protection regulations in your country of residence.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">23. Force Majeure</h3>
                      <p className="text-muted-foreground mb-6">
                        BIT Access is not liable for delays or failures caused by events beyond our reasonable control including natural disasters, wars, government actions, network failures, blockchain congestion, exchange outages, or other force majeure events. Services may be suspended during such events.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">24. Severability</h3>
                      <p className="text-muted-foreground mb-6">
                        If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in full effect. Invalid provisions will be modified to the minimum extent necessary to make them valid while preserving intent.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">25. Entire Agreement</h3>
                      <p className="text-muted-foreground mb-6">
                        These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and BIT Access regarding use of our services. These Terms supersede any prior agreements or understandings.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">26. Changes to Terms</h3>
                      <p className="text-muted-foreground mb-6">
                        We may update these Terms from time to time. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be communicated via email or platform notification 30 days before taking effect. Continued use after changes constitutes acceptance. If you don't agree to changes, discontinue use.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">27. Contact Information</h3>
                      <p className="text-muted-foreground mb-6">
                        For questions, concerns, or requests regarding these Terms of Use, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> support@bitaecosystem.org<br />
                        <strong>Legal:</strong> legal@bitaecosystem.org<br />
                        <strong>Website:</strong> https://bitaecosystem.org<br />
                        <strong>Telegram:</strong> @bitaecosystemofficial
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">28. Acknowledgment</h3>
                      <p className="text-muted-foreground">
                        By using BIT Access, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. You understand the risks associated with cryptocurrency investments and blockchain technology. You accept full responsibility for your use of the platform and any consequences thereof.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Cookie Policy Tab */}
              <TabsContent value="cookies">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
              }}>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Cookie className="w-8 h-8 text-primary" />
                        <CardTitle className="text-3xl">Cookie Policy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                      <p className="text-sm text-muted-foreground mb-6">
                        <strong>Last Updated:</strong> January 2025
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">1. What Are Cookies?</h3>
                      <p className="text-muted-foreground mb-6">
                        Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit BIT Access platform. They help us provide a better, faster, and more personalized user experience. Cookies contain information about your browsing session and preferences, allowing our website to recognize your device on subsequent visits.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">2. How We Use Cookies</h3>
                      <p className="text-muted-foreground mb-4">
                        We use cookies for several important purposes:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Remember your wallet connection status and preferences</li>
                        <li>Keep you logged in during your browsing session</li>
                        <li>Analyze site traffic and understand user behavior</li>
                        <li>Improve our services and user experience</li>
                        <li>Remember your language and display preferences</li>
                        <li>Provide personalized content and recommendations</li>
                        <li>Prevent fraud and enhance security</li>
                        <li>Support A/B testing of new features</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">3. Types of Cookies We Use</h3>
                      
                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Essential Cookies (Required)</h4>
                      <p className="text-muted-foreground mb-4">
                        These cookies are necessary for the website to function properly. They enable basic features like wallet connection, page navigation, and access to secure areas. The website cannot function properly without these cookies.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>Session management and authentication</li>
                        <li>Wallet connection state</li>
                        <li>Security and fraud prevention</li>
                        <li>Load balancing and network routing</li>
                      </ul>

                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Performance Cookies (Analytics)</h4>
                      <p className="text-muted-foreground mb-4">
                        These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us improve website performance and user experience.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>Google Analytics (page views, traffic sources, bounce rate)</li>
                        <li>User journey and behavior analysis</li>
                        <li>Error tracking and debugging</li>
                        <li>Performance monitoring and optimization</li>
                      </ul>

                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Functional Cookies (Preferences)</h4>
                      <p className="text-muted-foreground mb-4">
                        These cookies remember your preferences and choices to provide enhanced, personalized features.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>Language and region preferences</li>
                        <li>Dark/light mode selection</li>
                        <li>Dashboard customization settings</li>
                        <li>Notification preferences</li>
                        <li>Recently viewed merchants or products</li>
                      </ul>

                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Marketing Cookies (Third-Party)</h4>
                      <p className="text-muted-foreground mb-4">
                        These cookies track your online activity to help us deliver more relevant advertising and measure campaign effectiveness.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>Social media tracking (Facebook, Twitter, Telegram)</li>
                        <li>Advertising network cookies</li>
                        <li>Retargeting and remarketing</li>
                        <li>Campaign attribution and conversion tracking</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">4. Third-Party Cookies</h3>
                      <p className="text-muted-foreground mb-4">
                        Some cookies are placed by third-party services that appear on our pages:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
                        <li><strong>Web3Modal/WalletConnect:</strong> Wallet connection and authentication</li>
                        <li><strong>Social Media:</strong> Sharing buttons and embedded content (Twitter, Facebook, Telegram)</li>
                        <li><strong>Blockchain Explorers:</strong> Transaction verification and data display</li>
                        <li><strong>CDN Providers:</strong> Fast content delivery and caching</li>
                      </ul>
                      <p className="text-muted-foreground mb-6">
                        We do not control these third-party cookies. Please review their privacy policies for more information.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">5. Session vs Persistent Cookies</h3>
                      <p className="text-muted-foreground mb-4">
                        We use two types based on duration:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li><strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser. Used for wallet connection and navigation.</li>
                        <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted. Used to remember preferences and improve experience across visits.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">6. Managing and Controlling Cookies</h3>
                      <p className="text-muted-foreground mb-4">
                        You have several options to manage cookies:
                      </p>
                      
                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Browser Settings</h4>
                      <p className="text-muted-foreground mb-4">
                        Most browsers allow you to control cookies through settings. You can:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>View and delete existing cookies</li>
                        <li>Block all cookies or only third-party cookies</li>
                        <li>Clear cookies when closing the browser</li>
                        <li>Create exceptions for trusted websites</li>
                      </ul>

                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Browser-Specific Instructions</h4>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
                        <li><strong>Brave:</strong> Settings → Shields → Cookie blocking</li>
                      </ul>

                      <h4 className="text-lg font-bold text-primary mb-2 mt-4">Privacy Tools</h4>
                      <p className="text-muted-foreground mb-6">
                        You can also use privacy-focused browser extensions like Privacy Badger, uBlock Origin, or Ghostery to block tracking cookies and enhance privacy.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">7. Impact of Disabling Cookies</h3>
                      <p className="text-muted-foreground mb-4">
                        Note that blocking or deleting cookies may affect site functionality:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                        <li>Wallet connection may not persist between sessions</li>
                        <li>Preferences and settings will not be saved</li>
                        <li>Some features may not work properly</li>
                        <li>You may see less relevant content</li>
                        <li>User experience may be degraded</li>
                      </ul>
                      <p className="text-muted-foreground mb-6">
                        Essential cookies cannot be disabled as they are necessary for core platform functionality.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">8. Cookie Consent</h3>
                      <p className="text-muted-foreground mb-6">
                        When you first visit BIT Access, you'll see a cookie consent banner. You can choose to accept all cookies or customize your preferences. Your consent is stored in a cookie and remains valid for 12 months. You can change your preferences at any time through your browser settings.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">9. Do Not Track (DNT)</h3>
                      <p className="text-muted-foreground mb-6">
                        Some browsers offer a "Do Not Track" (DNT) feature. Currently, there is no industry standard for DNT signals. BIT Access respects browser privacy settings but may not respond to DNT signals unless required by law. We recommend using browser cookie controls and privacy tools for granular tracking control.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">10. Mobile Devices</h3>
                      <p className="text-muted-foreground mb-6">
                        Mobile browsers also use cookies. Managing cookies on mobile devices varies by operating system and browser. Typically, you can find cookie settings in your browser's privacy or security section. iOS users can also limit ad tracking through Settings → Privacy → Tracking.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">11. Local Storage and Similar Technologies</h3>
                      <p className="text-muted-foreground mb-6">
                        In addition to cookies, we may use similar technologies like Local Storage, Session Storage, and IndexedDB to store data locally on your device. These technologies serve similar purposes as cookies (storing preferences, caching data) but may have different characteristics and storage capabilities. Browser settings for cookies typically also control these technologies.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">12. Web3 and Blockchain Tracking</h3>
                      <p className="text-muted-foreground mb-6">
                        When you connect your wallet to BIT Access, your wallet address and transaction history are publicly visible on the blockchain. This is separate from cookies and is inherent to blockchain technology. Wallet providers (MetaMask, WalletConnect) may also use their own cookies and tracking technologies.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">13. Analytics Opt-Out</h3>
                      <p className="text-muted-foreground mb-4">
                        You can opt-out of Google Analytics tracking specifically by:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li>Installing the Google Analytics Opt-out Browser Add-on</li>
                        <li>Enabling privacy-focused browser settings</li>
                        <li>Using browser extensions that block analytics scripts</li>
                        <li>Adjusting your cookie preferences in our consent banner</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">14. International Cookie Regulations</h3>
                      <p className="text-muted-foreground mb-6">
                        We comply with international cookie regulations including the EU ePrivacy Directive (Cookie Law), GDPR requirements for cookie consent, CCPA disclosure obligations, and other regional privacy laws. Users in these jurisdictions have enhanced rights regarding cookie usage and can withdraw consent at any time.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">15. Cookie Lifespan</h3>
                      <p className="text-muted-foreground mb-4">
                        Different cookies have different lifespans:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li><strong>Session cookies:</strong> Deleted when browser closes</li>
                        <li><strong>Authentication cookies:</strong> 7-30 days</li>
                        <li><strong>Preference cookies:</strong> 30-365 days</li>
                        <li><strong>Analytics cookies:</strong> 24 months (Google Analytics default)</li>
                        <li><strong>Marketing cookies:</strong> Varies by provider (typically 90-365 days)</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">16. Security Cookies</h3>
                      <p className="text-muted-foreground mb-6">
                        We use security cookies to protect against fraud, unauthorized access, and malicious activities. These cookies help verify user identity, detect suspicious behavior, prevent CSRF attacks, and maintain secure sessions. Security cookies are essential and cannot be disabled.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">17. Updates to Cookie Policy</h3>
                      <p className="text-muted-foreground mb-6">
                        We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Continued use after changes constitutes acceptance.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">18. Cookie List and Details</h3>
                      <p className="text-muted-foreground mb-4">
                        Common cookies used on BIT Access platform:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1 ml-4">
                        <li><strong>_ga, _gid:</strong> Google Analytics (2 years / 24 hours)</li>
                        <li><strong>walletconnect:</strong> Wallet connection state (session)</li>
                        <li><strong>theme:</strong> Display mode preference (1 year)</li>
                        <li><strong>lang:</strong> Language preference (1 year)</li>
                        <li><strong>cookie_consent:</strong> Cookie consent choice (1 year)</li>
                        <li><strong>session_id:</strong> Session authentication (session)</li>
                      </ul>

                      <h3 className="text-xl font-bold text-primary mb-3">19. Children's Privacy</h3>
                      <p className="text-muted-foreground mb-6">
                        Our services are not directed to individuals under 18. We do not knowingly use cookies to collect information from children. If you believe a child has provided cookie data, please contact us immediately.
                      </p>

                      <h3 className="text-xl font-bold text-primary mb-3">20. Contact Us About Cookies</h3>
                      <p className="text-muted-foreground">
                        If you have questions about our use of cookies or this Cookie Policy, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> support@bitaecosystem.org<br />
                        <strong>Privacy:</strong> privacy@bitaecosystem.org<br />
                        <strong>Website:</strong> https://bitaecosystem.org<br />
                        <strong>Telegram:</strong> @bitaecosystemofficial
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>;
};
export default Helpdesk;