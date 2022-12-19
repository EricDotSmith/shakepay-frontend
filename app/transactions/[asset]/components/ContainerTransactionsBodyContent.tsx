import { fetchTransactionHistory } from "../../../utils";
import { TransactionItem } from "../../../components/TransactionItem";

interface ContainerBodyContentProps {
  asset: string;
}

const ContainerBodyContent = async (props: ContainerBodyContentProps) => {
  const { asset } = props;

  const transactionHistory = (await fetchTransactionHistory()).filter((transaction) => transaction.currency === asset);

  return (
    <>
      {transactionHistory.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction.createdAt as any} />
      ))}
    </>
  );
};

export default ContainerBodyContent;
