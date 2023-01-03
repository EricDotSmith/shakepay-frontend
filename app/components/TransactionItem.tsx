"use client";

import Image from "next/image";
import { useState } from "react";
import { Currency, Direction, Transaction, Type } from "../types";
import currency from "currency.js";

interface TransactionItemProps {
  transaction: Transaction;
}

const imageForTransactionType = (transaction: Transaction): string => {
  if (transaction.type === Type.CONVERSION) {
    return "exchange.svg";
  }

  if (transaction.direction === Direction.CREDIT) {
    return "cashin.svg";
  }

  return "cashout.svg";
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const [showTransactionInfo, setShowTransactionInfo] = useState(false);

  return (
    <>
      <div
        className="h-20 flex items-center justify-between p-4"
        onClick={() => {
          setShowTransactionInfo(true);
        }}
      >
        <div className="flex items-center">
          <Image
            className="mr-4"
            src={`/images/${imageForTransactionType(transaction)}`}
            width={30}
            height={30}
            alt="Your Name"
          />
          <div>
            <div className="font-semibold">{transaction.type}</div>
            <span className="text-gray-600">
              {new Date(transaction.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div
          className={`font-semibold text-md text-right ${
            transaction.direction === "credit"
              ? `text-green-500`
              : transaction.direction === "debit"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {transaction.direction === "credit" ? "" : transaction.direction === "debit" ? "-" : ""}
          {transaction.currency === Currency.CAD
            ? currency(transaction.amount).format() + ` ${transaction.currency}`
            : parseFloat(
                currency(transaction.amount, {
                  precision: 8,
                  symbol: "",
                }).format()
              ) + ` ${transaction.currency}`}
        </div>
      </div>
      {showTransactionInfo && (
        <>
          <div className="z-10 overflow-hidden w-11/12 h-64 rounded-2xl bg-white  absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
            <div className="flex flex-col h-full divide-y divide-gray-200">
              <div className="flex flex-row items-center justify-between">
                <div className="flex pl-2">
                  <Image
                    src={`/images/${imageForTransactionType(transaction)}`}
                    width={30}
                    height={30}
                    alt="Your Name"
                  />
                  <div className="p-4 pl-2 text-center font-semibold text-xl text-gray-600">{transaction.type}</div>
                </div>
                <button
                  onClick={() => {
                    setShowTransactionInfo(false);
                  }}
                  className="text-gray-600 rounded-full font-bold m-2 p-2 hover:bg-gray-100 select:bg-gray-600"
                >
                  X
                </button>
              </div>
              <div className="bg-gray-100 max-h-full h-[calc(100%) - 1px] overflow-y-scroll relative">
                {Object.keys(transaction).map((key) => (
                  <div className="flex w-full p-2 justify-between" key={transaction.createdAt as any}>
                    <div className="font-bold text-gray-600">{key}</div>
                    {!(key === "from" || key === "to") ? (
                      <div className="text-gray-500">{transaction[key as keyof Transaction]?.toString()}</div>
                    ) : (
                      <div className="text-gray-500">
                        {JSON.stringify(transaction[key as keyof Transaction], null, 1)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="w-full h-full bg-gray-900 opacity-80 absolute top-0"
            onClick={() => {
              setShowTransactionInfo(false);
            }}
          ></div>
        </>
      )}
    </>
  );
};
