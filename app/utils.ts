import { Transaction, Rates, Currency, Rate, AccountBalances } from "./types";
import currency from "currency.js";

export const fetchTransactionHistory = async (): Promise<Transaction[]> => {
  return await fetch("https://shakepay.github.io/programming-exercise/web/transaction_history.json").then((res) =>
    res.json()
  );
};

export const fetchRates = async (): Promise<Rates> => {
  return await fetch("https://shakepay.github.io/programming-exercise/web/rates.json").then((res) => res.json());
};

export const fetchDailyRateHistory = async (rate: keyof Rates): Promise<Rate[]> => {
  return await fetch(`https://shakepay.github.io/programming-exercise/web/rates_${rate}.json`).then((res) =>
    res.json()
  );
};

export const balancesFromTransactionHistory = (transactionHistory: Transaction[]): AccountBalances => {
  return transactionHistory.reduce(
    (prevBalance, currentTransaction) => updateBalancesWithTransaction(prevBalance, currentTransaction),
    { CAD: 0, BTC: 0, ETH: 0 }
  );
};

export const updateBalancesWithTransaction = (balances: AccountBalances, transaction: Transaction): AccountBalances => {
  const { amount, currency, direction, type, from, to } = transaction;

  if (type === "external account" || type === "peer") {
    const transactionTotal = direction === "credit" ? amount : -amount;

    return {
      ...balances,
      [currency]: balances[currency] + transactionTotal,
    };
  }

  return {
    ...balances,
    [from?.currency!]: balances[from?.currency!] - from?.amount!,
    [to?.currency!]: balances[to?.currency!] + to?.amount!,
  };
};

export const accountBalanceInCAD = async (): Promise<string> => {
  const transactionHistory = await fetchTransactionHistory();

  const rates = await fetchRates();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  const accountBalanceInCAD = currency(convertAssetBalanceToCADWithRates(accountBalances, rates));

  return accountBalanceInCAD.format({ symbol: "" });
};

export const convertAssetBalanceToCADWithRates = (balance: AccountBalances, rates: Rates): number => {
  return balance.CAD + balance.BTC * rates.BTC_CAD + balance.ETH * rates.ETH_CAD;
};

export const convertCurrency = (amount: number, from: Currency, to: Currency, currentRates: Rates): number =>
  from === to ? amount : amount * currentRates[(from + "_" + to) as keyof Rates];
