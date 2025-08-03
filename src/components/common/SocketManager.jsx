import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo, useEffect } from 'react';

import { useStockSocket } from '@/hooks/useStockSocket';
import { stocksAtom, stockPricesAtom } from '@/store/atoms';

const SocketManager = () => {
  const allStocks = useAtomValue(stocksAtom);
  const setStockPrices = useSetAtom(stockPricesAtom);

  const stockCodes = useMemo(() => allStocks.map((stock) => stock.stockCode), [allStocks]);
  const { stockData } = useStockSocket(stockCodes);

  useEffect(() => {
    if (stockData) {
      setStockPrices((prevPrices) => ({
        ...prevPrices,
        [stockData.stockCode]: stockData,
      }));
    }
  }, [stockData, setStockPrices]);

  return null;
};

export default SocketManager;
