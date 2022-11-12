import Link from "next/link";
import Image from "next/image";
import { AssetName, Rates } from "./types";
import { Container, ContainerHeader, ContainerScrollableBody } from "./components/Container";
import { fetchTransactionHistory, fetchRates, balancesFromTransactionHistory } from "./utils";

export default async function Home() {
	const transactionHistory = await fetchTransactionHistory();
	const rates: Rates = await fetchRates();

	const accountBalances = balancesFromTransactionHistory(transactionHistory);

	const accountBalanceInCAD = Math.round(
		accountBalances.CAD + accountBalances.BTC * rates.BTC_CAD + accountBalances.ETH + rates.ETH_CAD
	);

	return (
		<Container>
			<ContainerHeader>
				<div className="flex flex-col justify-center items-center space-y-5">
					<Image src="/images/logo.svg" width={70} height={0} alt="Your Name" />
					<div className="text-3xl">{accountBalanceInCAD}</div>
				</div>
			</ContainerHeader>
			<ContainerScrollableBody>
				{Object.keys(accountBalances).map((asset, key) => (
					<Link key={key} href={`/transactions/${AssetName[asset as keyof typeof accountBalances]}`}>
						<div className="h-16 bg-green-400 border">{asset}</div>
					</Link>
				))}
			</ContainerScrollableBody>
		</Container>
	);
}
