import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { config, projectId } from './config/web3';
import { BITBalanceProvider } from './contexts/BITBalanceContext';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Ecosystem from "./pages/Ecosystem";
import Tokenomics from "./pages/Tokenomics";
import Helpdesk from "./pages/Helpdesk";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import TokenomicsSimplified from "./pages/TokenomicsSimplified";
import Roadmap from "./pages/Roadmap";
import HowItWorks from "./pages/HowItWorks";
import Whitepaper from "./pages/Whitepaper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FFD700',
    '--w3m-border-radius-master': '2px',
    '--w3m-color-mix': '#FFD700',
    '--w3m-color-mix-strength': 20,
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    'e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4', // Bitget Wallet
  ],
});

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <BITBalanceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/tokenomics-simplified" element={<TokenomicsSimplified />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/helpdesk" element={<Helpdesk />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </BITBalanceProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
