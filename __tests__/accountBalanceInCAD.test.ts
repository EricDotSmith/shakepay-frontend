import { Currency, Direction, Type } from "../app/types";
import { describe } from "@jest/globals";
import { Transaction } from "../app/types";
import { balancesFromTransactionHistory, convertAssetBalanceToCADWithRates } from "../app/utils";

const transactions: Transaction[] = [
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
  {
    amount: 10,
    currency: Currency.CAD,
    direction: Direction.CREDIT,
    type: Type.PEER,
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
  {
    amount: 10,
    currency: Currency.CAD,
    direction: null,
    type: Type.CONVERSION,
    createdAt: new Date(),
    from: {
      currency: Currency.CAD,
      amount: 10,
    },
    to: {
      currency: Currency.BTC,
      amount: 200,
    },
  },
];

describe("accountBalanceInCAD", () => {
  it("should return the correct account balance in CAD currency", () => {
    // 0 ETH, 200 BTC, -1000 CAD
    const totalBalanceInCAD = convertAssetBalanceToCADWithRates(balancesFromTransactionHistory(transactions), {
      BTC_CAD: 1,
      CAD_BTC: 0,
      CAD_ETH: 0,
      ETH_CAD: 1,
      USD_BTC: 0,
      BTC_USD: 0,
      USD_ETH: 0,
      ETH_USD: 0,
      BTC_ETH: 0,
      ETH_BTC: 0,
      CAD_USD: 0,
      USD_CAD: 0,
    });

    expect(totalBalanceInCAD).toEqual(-800);
  });
});
