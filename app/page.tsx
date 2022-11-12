import { Rates, Transaction } from "./types";

export default async function Home() {
	const transactionHistory: Transaction[] = await fetch(
		"https://shakepay.github.io/programming-exercise/web/transaction_history.json"
	).then((res) => res.json());

	const rates: Rates = await fetch("https://shakepay.github.io/programming-exercise/web/rates.json").then((res) =>
		res.json()
	);

	const accountBalances = transactionHistory.reduce(
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
		{ BTC: 0, ETH: 0, CAD: 0 }
	);

	const accountBalanceInCAD =
		accountBalances.CAD + accountBalances.BTC * rates.BTC_CAD + accountBalances.ETH + rates.ETH_CAD;

	return (
		<div className="max-w-lg mx-auto absolute inset-0 divide-y divide-gray-700 bg-blue-100">
			<div className="h-1/6">Header</div>
			<div className="h-5/6">
				<div>{JSON.stringify(h)}</div>
				<div className="overflow-y-scroll max-h-full">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 312, 32, 52, 412, 3, 124, 2354].map((v, i) => (
						<div className="h-16 bg-green-400" key={i}>
							{v}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
