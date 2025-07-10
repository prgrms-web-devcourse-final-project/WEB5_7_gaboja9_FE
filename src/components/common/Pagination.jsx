import classNames from 'classnames';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: currentPage === 1 })}>
          <button onClick={() => onPageChange(currentPage - 1)} className="page-link">
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={classNames('page-item', { active: currentPage === number })}>
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className={classNames('page-item', { disabled: currentPage === totalPages })}>
          <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
