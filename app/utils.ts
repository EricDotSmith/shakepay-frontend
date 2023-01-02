import { Transaction, Rates, Currency, Rate } from "./types";
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

export const balancesFromTransactionHistory = (
  transactionHistory: Transaction[]
): { BTC: number; ETH: number; CAD: number } => {
  return transactionHistory.reduce(
    (prevBalance, currentTransaction) => {
      if (currentTransaction.type === "external account" || currentTransaction.type === "peer") {
        const transactionTotal =
          currentTransaction.direction === "credit" ? currentTransaction.amount : -currentTransaction.amount;

        return {
          ...prevBalance,
          [currentTransaction.currency]: prevBalance[currentTransaction.currency] + transactionTotal,
        };
      }
      return {
        ...prevBalance,
        [currentTransaction.from?.currency!]:
          prevBalance[currentTransaction.from?.currency!] - currentTransaction.from?.amount!,
        [currentTransaction.to?.currency!]:
          prevBalance[currentTransaction.to?.currency!] + currentTransaction.to?.amount!,
      };
    },
    { CAD: 0, BTC: 0, ETH: 0 }
  );
};

export const accountBalanceInCAD = async (): Promise<string> => {
  const transactionHistory = await fetchTransactionHistory();

  const rates = await fetchRates();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  const accountBalanceInCAD = currency(convertAssetBalanceToCADWithRates(accountBalances, rates));

  return accountBalanceInCAD.format({ symbol: "" });
};

export const convertAssetBalanceToCADWithRates = (
  balance: { BTC: number; ETH: number; CAD: number },
  rates: Rates
): number => {
  return balance.CAD + balance.BTC * rates.BTC_CAD + balance.ETH * rates.ETH_CAD;
};

export const convertCurrency = (amount: number, from: Currency, to: Currency, currentRates: Rates): number =>
  from === to ? amount : amount * currentRates[(from + "_" + to) as keyof Rates];
