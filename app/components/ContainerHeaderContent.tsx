import Image from "next/image";
import { accountBalanceInCAD } from "../utils";

export default async function ContainerHeaderContent() {
  const accountBalance = await accountBalanceInCAD();

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <Image src="/images/logo.svg" width={70} height={70} alt="Your Name" />
      <div className="text-2xl font-bold flex text-gray-500 justify-center">
        <span className="text-lg">$</span>
        {accountBalance + " CAD"}
      </div>
    </div>
  );
}
