import { motion } from "framer-motion";
import { Coins, PieChart, Lock, Users, TrendingUp, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TokenomicsSimplified = () => {
  const distribution = [
    { label: "Public Sale", percentage: 40, amount: "40B BIT", color: "bg-primary" },
    { label: "Staking Rewards", percentage: 25, amount: "25B BIT", color: "bg-blue-500" },
    { label: "Ecosystem Development", percentage: 15, amount: "15B BIT", color: "bg-purple-500" },
    { label: "Team & Advisors", percentage: 10, amount: "10B BIT", color: "bg-green-500" },
    { label: "Marketing & Partnerships", percentage: 7, amount: "7B BIT", color: "bg-yellow-500" },
    { label: "Reserve Fund", percentage: 3, amount: "3B BIT", color: "bg-red-500" },
  ];

  const features = [
    {
      icon: Coins,
      title: "Total Supply",
      value: "100 Billion BIT",
      description: "Fixed supply with no inflation"
    },
    {
      icon: Lock,
      title: "Token Lock",
      value: "Team tokens locked 24 months",
      description: "Gradual vesting for long-term commitment"
    },
    {
      icon: TrendingUp,
      title: "Burn Mechanism",
      value: "2% per transaction",
      description: "Deflationary model to increase value"
    },
    {
      icon: Gift,
      title: "Rewards",
      value: "Up to 15% APY",
      description: "Staking rewards for holders"
    },
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
            Tokenomics Simplified
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding how BIT tokens work and their distribution across the ecosystem
          </p>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary mb-2">{feature.value}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Token Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <PieChart className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Token Distribution</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {distribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.amount}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={item.percentage} className="flex-1" />
                    <span className="text-sm font-bold min-w-[3rem] text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Economic Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Economic Model</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-primary">Deflationary</h3>
                  <p className="text-sm text-muted-foreground">
                    2% of every transaction is burned, reducing total supply over time and increasing scarcity.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-primary">Reward System</h3>
                  <p className="text-sm text-muted-foreground">
                    Staking rewards up to 15% APY incentivize long-term holding and network participation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-primary">Utility Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    BIT tokens are used for purchases, staking, governance, and accessing premium features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TokenomicsSimplified;
