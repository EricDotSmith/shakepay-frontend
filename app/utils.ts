import { Transaction, Rates, Currency } from "./types";

export const fetchTransactionHistory = async (): Promise<Transaction[]> => {
	return await fetch("https://shakepay.github.io/programming-exercise/web/transaction_history.json").then((res) =>
		res.json()
	);
};

export const fetchRates = async (): Promise<Rates> => {
	return await fetch("https://shakepay.github.io/programming-exercise/web/rates.json").then((res) => res.json());
};

export const balancesFromTransactionHistory = (
	transactionHistory: Transaction[]
): { BTC: number; ETH: number; CAD: number } => {
	return transactionHistory.reduce(
		(prevBalance, currentTransaction) => {
			if (!!currentTransaction.direction) {
				const transactionTotal =
					currentTransaction.direction === "credit" ? currentTransaction.amount : -currentTransaction.amount;

				return {
					...prevBalance,
					[currentTransaction.currency]: prevBalance[currentTransaction.currency] + transactionTotal,
				};
			}

			return prevBalance;
		},
		{ CAD: 0, BTC: 0, ETH: 0 }
	);
};

export const convertCurrency = (amount: number, from: Currency, to: Currency, currentRates: Rates): number =>
	from === to ? amount : amount * currentRates[(from + "_" + to) as keyof Rates];
