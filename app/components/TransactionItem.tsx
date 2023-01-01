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
          <div className="z-10  w-11/12 h-64 rounded-2xl bg-white  absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
            <div className="flex flex-col divide-y divide-gray-200">
              <div className="p-4 text-center font-semibold text-xl text-gray-600">{transaction.type}</div>
              <div className="p-4 whitespace-normal font-medium text-md text-gray-600">
                {JSON.stringify(transaction, null, 1)}
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
