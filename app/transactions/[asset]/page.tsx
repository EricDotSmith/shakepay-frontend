import Link from "next/link";
import Image from "next/image";
import { Container, ContainerHeader, ContainerScrollableBody } from "../../components/Container";
import { AssetName, Currency, Direction, Transaction, Type } from "../../types";
import { fetchTransactionHistory, balancesFromTransactionHistory } from "../../utils";
import { TransactionItem } from "../../components/TransactionItem";

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
          <TransactionItem transaction={transaction} key={transaction.createdAt as any} />
        ))}
      </ContainerScrollableBody>
    </Container>
  );
}
