export interface Item {
  id: number;
  name: string;
  description: string;
  price: bigint;
  merchant: string;
  stock: number;
  active: boolean;
  category: string;
  imageUrl: string;
}

export interface ExchangeRecord {
  buyer: string;
  itemId: number;
  price: bigint;
  timestamp: number;
  txHash: string;
}
