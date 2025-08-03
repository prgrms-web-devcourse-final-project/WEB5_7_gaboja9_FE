import { useAtomValue } from 'jotai';
import { useState, useMemo } from 'react';

import Pagination from '@/components/common/Pagination';
import StockTable from '@/components/StockTable';
import { stocksAtom, stockPricesAtom } from '@/store/atoms';

const ITEMS_PER_PAGE = 10;

const StocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const allStocks = useAtomValue(stocksAtom);
  const stockPrices = useAtomValue(stockPricesAtom);

  const combinedStocks = useMemo(() => {
    return allStocks.map((stock) => {
      const priceInfo = stockPrices[stock.stockCode];
      return {
        id: stock.stockCode,
        name: stock.stockName,
        currentPrice: priceInfo?.currentPrice || 0,
        changeRate: priceInfo?.dayOverDayPercent || 0,
        volume: priceInfo?.cumulativeVolume || 0,
        marketCap: 'N/A',
      };
    });
  }, [allStocks, stockPrices]);

  const filteredStocks = useMemo(() => {
    if (!searchTerm) {
      return combinedStocks;
    }
    return combinedStocks.filter((stock) => stock.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, combinedStocks]);

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return filteredStocks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredStocks]);

  return (
    <div className="stocks-page">
      <div className="stocks-page__header">
        <h1>종목 목록</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="종목명을 입력하세요"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button>검색</button>
        </div>
      </div>
      <StockTable stocks={currentTableData} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default StocksPage;
