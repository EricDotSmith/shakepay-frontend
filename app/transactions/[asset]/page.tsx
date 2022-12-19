import { Container, ContainerHeader, ContainerScrollableBody } from "../../components/Container";
import { AssetName, Currency } from "../../types";

import ContainerBodyContent from "./components/ContainerTransactionsBodyContent";
import { Suspense } from "react";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import Image from "next/image";
import ContainerHeaderContent, { GoHomeButton } from "./components/ContainerTransactionsHeaderContent";

export default async function Page({ params }: { params: { asset: string } }) {
  const asset = params.asset;

  if (!(asset in Currency)) {
    return (
      <Container>
        <div className="flex flex-col justify-center h-full items-center">
          <div className=" font-bold text-4xl text-gray-700">Asset does not exist!</div>
          <GoHomeButton />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ContainerHeader>
        <Suspense
          fallback={
            <div className="p-4 space-y-2">
              <div className=" flex">
                <GoHomeButton />
                <div className="text-right w-full text-2xl text-gray-600">{AssetName[asset as Currency]}</div>
                <div></div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold text-gray-600">Balance</div>
                <SkeletonWrapper animation="wave">
                  <div className="font-bold text-lg text-gray-800">.................</div>
                </SkeletonWrapper>
              </div>
            </div>
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <ContainerHeaderContent asset={asset} />
        </Suspense>
      </ContainerHeader>
      <ContainerScrollableBody>
        <div className="font-bold text-lg text-gray-800 p-4">Transactions</div>
        <Suspense
          fallback={
            <>
              {[...new Array(5)].map((_, key) => (
                <div className="flex w-full space-x-2 p-2" key={key}>
                  <SkeletonWrapper variant="circular" animation="wave">
                    <Image src="" width={30} height={30} alt="" />
                  </SkeletonWrapper>
                  <SkeletonWrapper width={"100%"} animation="wave"></SkeletonWrapper>
                </div>
              ))}
            </>
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <ContainerBodyContent asset={asset} />
        </Suspense>
      </ContainerScrollableBody>
    </Container>
  );
}
