import Image from "next/image";
import Link from "next/link";
import { fetchTransactionHistory, fetchRates, balancesFromTransactionHistory } from "../utils";
import { AssetName, Currency, Rates } from "../types";

export default async function ContainerBodyContent() {
  const transactionHistory = await fetchTransactionHistory();
  const rates = await fetchRates();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  return (
    <>
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
    </>
  );
}
