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
  merchantWhatsApp: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark: string;
}

export interface ExchangeRecord {
  buyer: string;
  itemId: number;
  price: bigint;
  timestamp: number;
  txHash: string;
}
