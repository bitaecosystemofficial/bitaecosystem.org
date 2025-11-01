import { useEffect, useState } from "react";
import { fetchTokenHolders } from "@/utils/bscscan";

export const useTokenHolders = () => {
  const [holderCount, setHolderCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolders = async () => {
      setLoading(true);
      const count = await fetchTokenHolders();
      setHolderCount(count);
      setLoading(false);
    };

    loadHolders();
    // Refresh every 60 seconds
    const interval = setInterval(loadHolders, 60000);
    return () => clearInterval(interval);
  }, []);

  return { holderCount, loading };
};
