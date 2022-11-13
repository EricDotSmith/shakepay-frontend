import Link from "next/link";
import Image from "next/image";
import { AssetName, Currency, Rates } from "./types";
import { Container, ContainerHeader, ContainerScrollableBody } from "./components/Container";
import { fetchTransactionHistory, fetchRates, balancesFromTransactionHistory } from "./utils";

export default async function Home() {
  const transactionHistory = await fetchTransactionHistory();
  const rates = await fetchRates();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  const accountBalanceInCAD = (
    accountBalances.CAD +
    accountBalances.BTC * rates.BTC_CAD +
    accountBalances.ETH +
    rates.ETH_CAD
  ).toFixed(2);

  return (
    <Container>
      <ContainerHeader>
        <div className="flex flex-col justify-center items-center space-y-5">
          <Image src="/images/logo.svg" width={70} height={70} alt="Your Name" />
          <div className="text-2xl flex justify-center">
            <span className="text-lg text-gray-500">$</span>
            {accountBalanceInCAD}
          </div>
        </div>
      </ContainerHeader>
      <ContainerScrollableBody>
        {(Object.keys(accountBalances) as Currency[]).map((asset, key) => (
          <Link key={key} href={`/transactions/${asset}`}>
            <div className="flex items-center justify-between h-16 p-4">
              <div className="flex">
                <Image
                  className="mr-4"
                  src={`/images/currency ${asset.toLowerCase()}.svg`}
                  width={30}
                  height={30}
                  alt="Your Name"
                />

                <div className="flex flex-col justify-center">
                  <span className="font-medium">{AssetName[asset]}</span>
                  {asset !== Currency.CAD && (
                    <span className="text-gray-500">{"$" + rates[(asset + "_" + Currency.CAD) as keyof Rates]}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-right">{accountBalances[asset].toFixed(2)}</span>
                {asset !== Currency.CAD && (
                  <span className="text-gray-500 text-right">
                    {(accountBalances[asset] * rates[(asset + "_" + Currency.CAD) as keyof Rates]).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </ContainerScrollableBody>
    </Container>
  );
}
