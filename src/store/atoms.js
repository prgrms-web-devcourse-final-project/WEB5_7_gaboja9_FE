import { atom } from 'jotai';

import { MOCK_USER_ASSETS, MOCK_OWNED_STOCKS, MOCK_WATCHLIST, MOCK_RECENT_TRANSACTIONS } from '../constants/mockData';

export const userAssetsAtom = atom(MOCK_USER_ASSETS);
export const ownedStocksAtom = atom(MOCK_OWNED_STOCKS);
export const watchListAtom = atom(MOCK_WATCHLIST);
export const recentTransactionsAtom = atom(MOCK_RECENT_TRANSACTIONS);

export const totalStockValueAtom = atom((get) => {
  const stocks = get(ownedStocksAtom);
  return stocks.reduce((total, stock) => total + stock.currentPrice * stock.quantity, 0);
});

export const totalAssetsAtom = atom((get) => {
  const cash = get(userAssetsAtom).availableCash;
  const stockValue = get(totalStockValueAtom);
  return cash + stockValue;
});
