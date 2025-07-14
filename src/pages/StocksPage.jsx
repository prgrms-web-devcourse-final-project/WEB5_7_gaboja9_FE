import { useState, useMemo } from 'react';

import Pagination from '@/components/common/Pagination';
import StockTable from '@/components/StockTable';
import { MOCK_ALL_STOCKS } from '@/constants/mockData';

const ITEMS_PER_PAGE = 10;

const StocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStocks = useMemo(() => {
    if (!searchTerm) {
      return MOCK_ALL_STOCKS;
    }
    return MOCK_ALL_STOCKS.filter((stock) => stock.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

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
