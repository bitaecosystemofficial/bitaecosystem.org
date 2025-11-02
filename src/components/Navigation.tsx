import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Wallet, PieChart, MapPin, HelpCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import bitAccessLogo from '@/assets/bit-access-logo.png';
import TokenomicsSimplified from '@/pages/TokenomicsSimplified';
import Roadmap from '@/pages/Roadmap';
import HowItWorks from '@/pages/HowItWorks';
import Whitepaper from '@/pages/Whitepaper';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const navigate = useNavigate();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/overview', label: 'Overview' },
    { path: '/ecosystem', label: 'Ecosystem' },
    { path: '/tokenomics', label: 'Tokenomics' },
    { path: '/helpdesk', label: 'Helpdesk' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const mobileOnlyLinks = [
    { path: '/tokenomics-simplified', label: 'Tokenomics Simplified', icon: PieChart },
    { path: '/roadmap', label: 'Roadmap', icon: MapPin },
    { path: '/how-it-works', label: 'How It Works', icon: HelpCircle },
    { path: '/whitepaper', label: 'Whitepaper', icon: FileText },
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleModalOpen = (modalName: string) => {
    setOpenModal(modalName);
    setIsMobileMenuOpen(false);
  };

  const renderModalContent = () => {
    switch(openModal) {
      case 'tokenomics-simplified':
        return <TokenomicsSimplified />;
      case 'roadmap':
        return <Roadmap />;
      case 'howitworks':
        return <HowItWorks />;
      case 'whitepaper':
        return <Whitepaper />;
      default:
        return null;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src={bitAccessLogo} alt="Bit Access Logo" className="w-10 h-10" />
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Bit Access</span>
              <span className="text-sm text-muted-foreground">(BIT)</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop - Connect Wallet */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => open()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
            >
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </Button>
          </div>

          {/* Mobile Menu - Only show resources when connected */}
          {!isDashboard && isConnected && (
            <div className="md:hidden flex items-center gap-2">
              <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="text-foreground"
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-sm z-[100]">
                  <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
                    Resources
                  </div>
                  {mobileOnlyLinks.map((link) => {
                    const Icon = link.icon;
                    const modalKey = link.path.replace('/', '').replace(/how-it-works/g, 'howitworks');
                    return (
                      <DropdownMenuItem key={link.path} asChild>
                        <button 
                          onClick={() => handleModalOpen(modalKey)}
                          className="cursor-pointer flex items-center gap-3 p-3 w-full text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{link.label}</span>
                        </button>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {/* Mobile Connect Wallet Button - Only show when not connected */}
          {!isDashboard && !isConnected && (
            <div className="md:hidden">
              <Button 
                onClick={() => open()}
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Sheet for Resources */}
      <Sheet open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
        <SheetContent side="bottom" className="h-[95vh] overflow-y-auto p-0">
          <div className="sticky top-0 bg-background z-10 border-b px-6 py-4">
            <SheetHeader>
              <SheetTitle>
                {openModal === 'tokenomics-simplified' && 'Tokenomics Simplified'}
                {openModal === 'roadmap' && 'Roadmap'}
                {openModal === 'howitworks' && 'How It Works'}
                {openModal === 'whitepaper' && 'Whitepaper'}
              </SheetTitle>
            </SheetHeader>
          </div>
          <div className="px-6 pb-6">
            {renderModalContent()}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navigation;
