import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import FloatingBubbles from './FloatingBubbles';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBubbles />
      <Navigation />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
