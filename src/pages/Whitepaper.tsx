import { motion } from "framer-motion";
import { FileText, Download, BookOpen, Target, Lightbulb, Shield, Globe, Coins, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Whitepaper = () => {
  const sections = [
    {
      icon: Lightbulb,
      title: "Executive Summary",
      content: "Bit Access is a revolutionary blockchain ecosystem that bridges traditional commerce with Web3 technology. Our platform enables merchants to accept stablecoin payments while rewarding customers with BIT tokens, creating a sustainable economic model that benefits all participants."
    },
    {
      icon: Target,
      title: "Vision & Mission",
      content: "Our vision is to create a global payment ecosystem where digital assets seamlessly integrate with everyday transactions. We mission to empower 1 million merchants and 10 million users by 2026, making crypto payments accessible and rewarding for everyone."
    },
    {
      icon: Coins,
      title: "Token Economics",
      content: "BIT token is the cornerstone of our ecosystem with a fixed supply of 100 billion tokens. The deflationary model includes a 2% burn mechanism on every transaction, ensuring long-term value appreciation. Staking rewards up to 15% APY incentivize holding and network participation."
    },
    {
      icon: Globe,
      title: "Multi-Chain Strategy",
      content: "Deployed on BSC, Polygon, Base, and Arbitrum, our multi-chain approach ensures scalability, low fees, and maximum accessibility. Users can seamlessly interact with the ecosystem on their preferred blockchain without compromising on speed or cost."
    },
    {
      icon: Shield,
      title: "Security & Audits",
      content: "Security is our top priority. All smart contracts undergo rigorous audits by leading security firms. We implement best practices including multi-signature wallets, time-locks on critical functions, and regular penetration testing to ensure user funds are protected."
    },
    {
      icon: Users,
      title: "Use Cases",
      content: "BIT tokens serve multiple purposes: purchasing products in Exchange Shop, earning staking rewards, participating in governance decisions, accessing premium features, and receiving community task rewards. The utility-driven model ensures consistent demand and value."
    }
  ];

  const downloadWhitepaper = () => {
    // Placeholder for whitepaper download
    alert("Whitepaper download will be available soon!");
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
          <FileText className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Whitepaper
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive documentation of the Bit Access ecosystem, technology, and vision
          </p>
          <Button onClick={downloadWhitepaper} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download Full Whitepaper (PDF)
          </Button>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                    <section.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Download our comprehensive whitepaper for detailed technical information, tokenomics breakdown, and future development plans.
              </p>
              <Button onClick={downloadWhitepaper} size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Whitepaper
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Whitepaper;
