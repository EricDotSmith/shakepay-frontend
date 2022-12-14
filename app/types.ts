export interface Transaction {
  createdAt: Date;
  amount: number;
  currency: Currency;
  type: Type;
  direction: Direction | null;
  from?: From;
  to?: To;
}

export enum Currency {
  BTC = "BTC",
  CAD = "CAD",
  ETH = "ETH",
}

export enum Direction {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum Type {
  CONVERSION = "conversion",
  EXTERNAL_ACCOUNT = "external account",
  PEER = "peer",
}

interface From {
  currency?: Currency;
  amount?: number;
}

interface To {
  toAddress?: string;
  currency?: Currency;
  amount?: number;
}

export interface Rates {
  CAD_BTC: number;
  BTC_CAD: number;
  CAD_ETH: number;
  ETH_CAD: number;
  USD_BTC: number;
  BTC_USD: number;
  USD_ETH: number;
  ETH_USD: number;
  BTC_ETH: number;
  ETH_BTC: number;
  CAD_USD: number;
  USD_CAD: number;
}

export interface Rate {
  pair: keyof Rates;
  midMarketRate: number;
  createdAt: string;
}

export enum AssetName {
  BTC = "Bitcoin",
  ETH = "Ethereum",
  CAD = "Dollars",
}

export interface AccountBalances {
  BTC: number;
  ETH: number;
  CAD: number;
}
