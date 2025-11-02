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
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import bitAccessLogo from '@/assets/bit-access-logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

          {/* Mobile Menu */}
          {!isDashboard && (
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
                {/* Regular Navigation Links - Only shown when NOT connected */}
                {!isConnected && navLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link 
                      to={link.path} 
                      className={`cursor-pointer ${location.pathname === link.path ? 'text-primary' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                
                {/* Additional Pages - Only shown when connected */}
                {isConnected && (
                  <>
                    <div className="px-2 py-2 text-xs font-semibold text-muted-foreground">
                      Resources
                    </div>
                    {mobileOnlyLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <DropdownMenuItem key={link.path} asChild>
                          <Link 
                            to={link.path} 
                            className={`cursor-pointer flex items-center gap-3 p-3 ${
                              location.pathname === link.path ? 'bg-primary/10 text-primary' : ''
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{link.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </>
                )}
                
                {/* Wallet Section */}
                <DropdownMenuItem className="border-t mt-2 pt-2">
                  {isConnected && address ? (
                    <div className="flex flex-col gap-2 w-full">
                      <span className="font-mono text-sm">{formatAddress(address)}</span>
                      <Button 
                        onClick={() => {
                          disconnect();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        open();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-primary text-primary-foreground"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
