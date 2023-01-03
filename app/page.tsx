import Image from "next/image";
import { Container, ContainerHeader, ContainerScrollableBody } from "./components/Container";
import ContainerHeaderContent from "./components/ContainerHeaderContent";
import { Suspense } from "react";
import SkeletonWrapper from "./components/SkeletonWrapper";
import ContainerBodyContent from "./components/ContainerBodyContent";

export default async function Page() {
  return (
    <Container>
      <ContainerHeader>
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center h-full space-y-5">
              <Image src="/images/logo.svg" width={70} height={70} alt="Your Name" />

              <SkeletonWrapper animation="wave">
                <div className="text-2xl flex justify-center">...............................</div>
              </SkeletonWrapper>
            </div>
          }
        >
          {/* @ts-expect-error Async Server Component */}
          <ContainerHeaderContent />
        </Suspense>
      </ContainerHeader>
      <ContainerScrollableBody>
        <Suspense
          fallback={
            <>
              <SkeletonWrapper width={"100%"} height={200} animation="wave"></SkeletonWrapper>
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
          <ContainerBodyContent />
        </Suspense>
      </ContainerScrollableBody>
    </Container>
  );
}
