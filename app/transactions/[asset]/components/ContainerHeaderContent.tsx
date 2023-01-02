import Link from "next/link";
import { fetchTransactionHistory, balancesFromTransactionHistory } from "../../../utils";
import { Currency } from "../../../types";
import currency from "currency.js";
import Image from "next/image";

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

  const transactionHistory = await fetchTransactionHistory();

  const accountBalances = balancesFromTransactionHistory(transactionHistory);

  return (
    <div className="p-4 space-y-2">
      <div className=" flex">
        <GoHomeButton />
        <div className="flex justify-end w-full text-2xl text-gray-600">
          <Image src={`/images/currency ${asset.toLowerCase()}.svg`} width={30} height={30} alt="Your Name" />
        </div>
        <div></div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-gray-600">Balance</div>
        <div className="font-bold text-lg text-gray-500">
          {(asset === Currency.CAD
            ? currency(accountBalances[asset as Currency]).format()
            : parseFloat(
                currency(accountBalances[asset as Currency], {
                  precision: 8,
                  symbol: "",
                }).format()
              )) + ` ${asset}`}
        </div>
      </div>
    </div>
  );
};

export default ContainerHeaderContent;
