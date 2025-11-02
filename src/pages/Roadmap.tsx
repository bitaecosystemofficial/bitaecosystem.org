import { motion } from "framer-motion";
import { CheckCircle, Clock, Target, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Roadmap = () => {
  const phases = [
    {
      quarter: "Q1 2024",
      status: "completed",
      icon: CheckCircle,
      title: "Foundation Phase",
      items: [
        "Token smart contract deployment on BSC",
        "Website and social media launch",
        "Community building initiatives",
        "Initial partnerships with wallets",
        "Security audits completed"
      ]
    },
    {
      quarter: "Q2 2024",
      status: "completed",
      icon: CheckCircle,
      title: "Growth Phase",
      items: [
        "Public token sale launch",
        "Multi-chain expansion (Polygon, Base, Arbitrum)",
        "Staking platform development",
        "DEX listings on PancakeSwap",
        "10,000+ community members"
      ]
    },
    {
      quarter: "Q3 2024",
      status: "in-progress",
      icon: Clock,
      title: "Expansion Phase",
      items: [
        "Exchange Shop marketplace launch",
        "Community tasks and rewards system",
        "Mobile app development (iOS & Android)",
        "Strategic partnerships with merchants",
        "CEX listing applications"
      ]
    },
    {
      quarter: "Q4 2024",
      status: "upcoming",
      icon: Target,
      title: "Ecosystem Phase",
      items: [
        "NFT marketplace integration",
        "Governance token utilities",
        "Advanced staking tiers",
        "International expansion",
        "50,000+ token holders"
      ]
    },
    {
      quarter: "2025",
      status: "upcoming",
      icon: Rocket,
      title: "Innovation Phase",
      items: [
        "DeFi protocol integrations",
        "Cross-chain bridge development",
        "AI-powered features",
        "Enterprise merchant solutions",
        "Global payment gateway"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "upcoming": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "upcoming": return "Upcoming";
      default: return status;
    }
  };

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
            Project Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our journey to revolutionize digital payments and rewards ecosystem
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 h-full" />

          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-4 md:gap-8 items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  <Card className="border-primary/20 hover:border-primary/40 transition-all">
                    <CardHeader>
                      <div className={`flex items-center gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <Badge className={`${getStatusColor(phase.status)}`}>
                          {getStatusLabel(phase.status)}
                        </Badge>
                        <CardTitle className="text-2xl">{phase.quarter}</CardTitle>
                      </div>
                      <h3 className="text-xl font-semibold text-primary mt-2">{phase.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary z-10 border-4 border-background">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
