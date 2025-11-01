import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const { isConnected } = useAccount();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isVisible && !isInstalled) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [isVisible, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error('Installation prompt not available');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast.success('App installed successfully!');
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isConnected || isInstalled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed right-4 top-20 z-40"
        >
          <div className="relative bg-card border-2 border-primary/30 rounded-lg shadow-lg p-3 max-w-[200px]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-3 w-3" />
            </Button>
            <Button
              onClick={handleInstallClick}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 px-3 py-2"
              size="sm"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs font-medium">Install App</span>
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Add to home screen for quick access
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
