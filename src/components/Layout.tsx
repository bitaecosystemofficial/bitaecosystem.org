import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingBubbles from './FloatingBubbles';
import globalBg from '@/assets/new-global-bg.png';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen text-foreground relative">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${globalBg})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      <FloatingBubbles />
      <Navigation />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
