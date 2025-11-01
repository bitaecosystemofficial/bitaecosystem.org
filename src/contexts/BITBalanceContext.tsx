import { createContext, useContext, useState, ReactNode } from 'react';

interface BITBalanceContextType {
  balance: number;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
  formatBalance: (amount: number) => string;
}

const BITBalanceContext = createContext<BITBalanceContextType | undefined>(undefined);

export const BITBalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);

  const addBalance = (amount: number) => {
    setBalance((prev) => prev + amount);
  };

  const deductBalance = (amount: number): boolean => {
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const formatBalance = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <BITBalanceContext.Provider value={{ balance, addBalance, deductBalance, formatBalance }}>
      {children}
    </BITBalanceContext.Provider>
  );
};

export const useBITBalance = () => {
  const context = useContext(BITBalanceContext);
  if (!context) {
    throw new Error('useBITBalance must be used within BITBalanceProvider');
  }
  return context;
};
