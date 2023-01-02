import Image from "next/image";
import Link from "next/link";
import { fetchTransactionHistory, fetchRates, balancesFromTransactionHistory } from "../utils";
import { AssetName, Currency, Rates } from "../types";
import currency from "currency.js";
import LineChartWrapper from "./LineChartWrapper";

export default async function ContainerBodyContent() {
  const transactionHistory = await fetchTransactionHistory();
  const rates = await fetchRates();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  return (
    <>
      <LineChartWrapper />
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
                  <span className="text-gray-500">
                    {currency(rates[(asset + "_" + Currency.CAD) as keyof Rates]).format()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-right">
                {currency(accountBalances[asset], {
                  precision: asset === Currency.CAD ? 2 : 8,
                  symbol: asset === Currency.CAD ? "$" : "",
                }).format() + ` ${asset}`}
              </span>
              {asset !== Currency.CAD && (
                <span className="text-gray-500 text-right">
                  {currency(accountBalances[asset] * rates[(asset + "_" + Currency.CAD) as keyof Rates]).format()}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
