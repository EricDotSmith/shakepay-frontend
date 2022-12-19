import Link from "next/link";
import { fetchTransactionHistory, balancesFromTransactionHistory } from "../../../utils";
import { AssetName, Currency } from "../../../types";

export const GoHomeButton = () => {
  return (
    <Link href={`/`}>
      <div className="font-extrabold text-sm text-gray-600 border-2 p-1 border-gray-300 rounded-md">{"BACK"}</div>
    </Link>
  );
};

interface ContainerHeaderContentProps {
  asset: string;
}

const ContainerHeaderContent = async (props: ContainerHeaderContentProps) => {
  const { asset } = props;

  const transactionHistory = (await fetchTransactionHistory()).filter((transaction) => transaction.currency === asset);

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  return (
    <div className="p-4 space-y-2">
      <div className=" flex">
        <GoHomeButton />
        <div className="text-right w-full text-2xl text-gray-600">{AssetName[asset as Currency]}</div>
        <div></div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-gray-600">Balance</div>
        <div className="font-bold text-lg text-gray-800">{accountBalances[asset as Currency].toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ContainerHeaderContent;
