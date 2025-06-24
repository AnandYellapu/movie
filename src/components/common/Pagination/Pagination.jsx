import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const page = currentPage - 2 + i;
    return page > 0 && page <= totalPages ? page : null;
  }).filter(Boolean);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ⬅ Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next ➡
      </button>
    </div>
  );
};

export default Pagination;
