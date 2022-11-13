import Link from "next/link";
import Image from "next/image";
import { Container, ContainerHeader, ContainerScrollableBody } from "../../components/Container";
import { AssetName, Currency, Direction, Transaction, Type } from "../../types";
import { fetchTransactionHistory, fetchRates, balancesFromTransactionHistory } from "../../utils";

const GoHomeButton = () => {
	return (
		<Link href={`/`}>
			<div className="font-extrabold text-sm text-gray-600 border-2 p-1 border-gray-300 rounded-md">{"BACK"}</div>
		</Link>
	);
};

export default async function Page({ params }: { params: { asset: string } }) {
	if (!(params.asset in Currency)) {
		return (
			<Container>
				<div className="flex flex-col justify-center h-full items-center">
					<div className=" font-bold text-4xl text-gray-700">Asset does not exist!</div>
					<GoHomeButton />
				</div>
			</Container>
		);
	}

	const transactionHistory = (await fetchTransactionHistory()).filter(
		(transaction) => transaction.currency === params.asset
	);

	const accountBalances = balancesFromTransactionHistory(transactionHistory);

	const imageForTransactionType = (transaction: Transaction): string => {
		if (transaction.type === Type.CONVERSION) {
			return "exchange.svg";
		}

		if (transaction.direction === Direction.CREDIT) {
			return "cashin.svg";
		}

		return "cashout.svg";
	};

	return (
		<Container>
			<ContainerHeader>
				<div className="p-4 space-y-2">
					<div className=" flex">
						<GoHomeButton />
						<div className="text-right w-full text-2xl text-gray-600">{AssetName[params.asset as Currency]}</div>
						<div></div>
					</div>
					<div className="flex justify-between">
						<div className="font-bold text-gray-600">Balance</div>
						<div className="font-bold text-lg text-gray-800">
							{accountBalances[params.asset as Currency].toFixed(2)}
						</div>
					</div>
				</div>
			</ContainerHeader>
			<ContainerScrollableBody>
				<div className="font-bold text-lg text-gray-800 p-4">Transactions</div>
				{transactionHistory.map((transaction) => (
					<div key={transaction.createdAt as any} className="h-20 flex items-center justify-between p-4">
						<div className="flex items-center">
							<Image
								className="mr-4"
								src={`/images/${imageForTransactionType(transaction)}`}
								width={30}
								height={30}
								alt="Your Name"
							/>
							<div>
								<div className="font-semibold">
									{transaction.type +
										(transaction.type === Type.CONVERSION
											? ` ${transaction.from?.currency} -> ${transaction.to?.currency}`
											: "")}
								</div>
								<span className="text-gray-600">
									{new Date(transaction.createdAt).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</span>
							</div>
						</div>
						<div
							className={`font-semibold text-md ${
								transaction.direction === "credit" ? `text-green-500` : transaction.direction === "debit" ? "" : ""
							}`}
						>
							{transaction.direction === "credit" ? "" : transaction.direction === "debit" ? "-" : ""}
							{transaction.amount.toFixed(4)} {transaction.currency}
						</div>
					</div>
				))}
			</ContainerScrollableBody>
		</Container>
	);
}
