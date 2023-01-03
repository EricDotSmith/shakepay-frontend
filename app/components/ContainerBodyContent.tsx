import Image from "next/image";
import Link from "next/link";
import {
  fetchTransactionHistory,
  fetchRates,
  balancesFromTransactionHistory,
  fetchDailyRateHistory,
  updateBalancesWithTransaction,
} from "../utils";
import { AccountBalances, AssetName, Currency, Rates } from "../types";
import currency from "currency.js";
import LineChartWrapper from "./LineChartWrapper";

export default async function ContainerBodyContent() {
  const transactionHistoryData = fetchTransactionHistory();
  const ratesData = fetchRates();
  const cadEthRateHistoryData = fetchDailyRateHistory("CAD_ETH");
  const cadBtcRateHistoryData = fetchDailyRateHistory("CAD_BTC");

  const [transactionHistory, rates, cadEthRateHistory, cadBtcRateHistory] = await Promise.all([
    transactionHistoryData,
    ratesData,
    cadEthRateHistoryData,
    cadBtcRateHistoryData,
  ]);

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  const cadEthRateMap = new Map(
    cadEthRateHistory.map((rate) => [new Date(rate.createdAt).toDateString(), rate.midMarketRate])
  );
  const cadBtcRateMap = new Map(
    cadBtcRateHistory.map((rate) => [new Date(rate.createdAt).toDateString(), rate.midMarketRate])
  );

  const getRunningAccountBalances = () => {
    const runningBalances: [string, AccountBalances][] = [];
    let runningBalance: AccountBalances = { BTC: 0, ETH: 0, CAD: 0 };

    transactionHistory.reverse().forEach((transaction) => {
      const { createdAt } = transaction;
      const date = new Date(createdAt).toDateString();

      runningBalance = updateBalancesWithTransaction(runningBalance, transaction);

      runningBalances.push([date, runningBalance]);
    });

    return runningBalances;
  };

  const dataForGraph = getRunningAccountBalances()
    .filter(
      (runningAccountBalance) =>
        !!cadBtcRateMap.get(runningAccountBalance[0]) && !!cadEthRateMap.get(runningAccountBalance[0])
    )
    .map((runningAccountBalance) => {
      const [date, balances] = runningAccountBalance;

      const cadBtcRate = cadBtcRateMap.get(date);
      const cadEthRate = cadEthRateMap.get(date);

      const totalAccountBalanceInCAD = balances.CAD + balances.BTC * cadBtcRate! + balances.ETH * cadEthRate!;

      return { name: date, uv: totalAccountBalanceInCAD };
    });

  const minPoint = dataForGraph.reduce((min, p, i) => (p.uv < min.point.uv ? { point: p, idx: i } : min), {
    point: dataForGraph[0],
    idx: 0,
  });

  const maxPoint = dataForGraph.reduce((max, p, i) => (p.uv > max.point.uv ? { point: p, idx: i } : max), {
    point: dataForGraph[0],
    idx: 0,
  });

  return (
    <>
      <LineChartWrapper data={dataForGraph} minPoint={minPoint} maxPoint={maxPoint} />
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
