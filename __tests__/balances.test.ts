import { Currency, Direction, Type } from "../app/types";
import { describe } from "@jest/globals";
import { Transaction } from "../app/types";
import { balancesFromTransactionHistory } from "../app/utils";

const transactions1: Transaction[] = [
  {
    amount: 100,
    currency: Currency.CAD,
    direction: Direction.CREDIT,
    type: Type.EXTERNAL_ACCOUNT,
    createdAt: new Date(),
  },
  {
    amount: 100,
    currency: Currency.CAD,
    direction: Direction.DEBIT,
    type: Type.PEER,
    createdAt: new Date(),
  },
  {
    amount: 1000,
    currency: Currency.CAD,
    direction: Direction.DEBIT,
    type: Type.PEER,
    createdAt: new Date(),
  },
  {
    amount: 1000,
    currency: Currency.BTC,
    direction: Direction.DEBIT,
    type: Type.PEER,
    createdAt: new Date(),
  },
  {
    amount: 1000,
    currency: Currency.BTC,
    direction: Direction.CREDIT,
    type: Type.PEER,
    createdAt: new Date(),
  },
];

const transactions2: Transaction[] = [
  {
    amount: 10,
    currency: Currency.CAD,
    direction: Direction.CREDIT,
    type: Type.EXTERNAL_ACCOUNT,
    createdAt: new Date(),
  },
  {
    amount: 10,
    currency: Currency.CAD,
    direction: Direction.CREDIT,
    type: Type.EXTERNAL_ACCOUNT,
    createdAt: new Date(),
  },
  {
    amount: 10,
    currency: Currency.CAD,
    direction: Direction.DEBIT,
    type: Type.EXTERNAL_ACCOUNT,
    createdAt: new Date(),
  },
];

describe("balancesFromTransactionHistory", () => {
  it("should return zero balances with no transactions", async () => {
    const balances = balancesFromTransactionHistory([]);

    expect(balances).toEqual({
      CAD: 0,
      BTC: 0,
      ETH: 0,
    });
  });

  it("should return an object with correct balances", async () => {
    const balances1 = balancesFromTransactionHistory(transactions1);
    const balances2 = balancesFromTransactionHistory(transactions2);

    expect(balances1).toEqual({
      CAD: -1000,
      BTC: 0,
      ETH: 0,
    });

    expect(balances2).toEqual({
      CAD: 10,
      BTC: 0,
      ETH: 0,
    });
  });
});
