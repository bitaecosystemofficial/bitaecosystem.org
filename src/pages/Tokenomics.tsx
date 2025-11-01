import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, PieChart, FileText, Flame, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const Tokenomics = () => {
  const keyMetrics = [
    { label: "Token Name", value: "Bit Access (BIT)" },
    { label: "Total Supply", value: "100,000,000,000 BIT" },
    { label: "Decimals", value: "9" },
    { label: "Initial Price", value: "$0.00108 USDT/USDC" },
    { label: "Token Type", value: "Reward Token (BEP-20)" },
    { label: "Burn Mechanism", value: "Active" }
  ];

  const contractAddresses = [
    { label: "Token Contract", address: "0x1234...5678", icon: <Coins className="w-5 h-5" /> },
    { label: "Presale Contract", address: "0x2345...6789", icon: <TrendingDown className="w-5 h-5" /> },
    { label: "Staking Contract", address: "0x3456...7890", icon: <PieChart className="w-5 h-5" /> },
    { label: "Exchange Shop Contract", address: "0x4567...8901", icon: <FileText className="w-5 h-5" /> }
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

        {/* Contract Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Smart Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {contractAddresses.map((contract, index) => (
                  <div key={index} className="flex flex-col p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      {contract.icon}
                      <span className="font-medium text-sm">{contract.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono break-all">{contract.address}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deflationary Model - Two Columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Flame className="w-6 h-6 text-destructive" />
                  Rebates Burn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  <span className="font-bold text-destructive">1%</span> of every rebate bought from merchants is permanently burned — reducing total supply and enhancing scarcity over time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-primary" />
                  Tax
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  <span className="font-bold text-primary">3% Buy / 3% Sell</span> tax applied on all transactions, contributing to liquidity, rewards, and project sustainability.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Token Distribution & Funding Allocation - Two Columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Token Distribution */}
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

          {/* Funding Allocation */}
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
