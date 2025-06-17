import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalElements, 
  pageSize, 
  onPageChange 
}) => {
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(0, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (range[0] > 0) {
      if (range[0] > 1) {
        rangeWithDots.push(0, '...');
      } else {
        rangeWithDots.push(0);
      }
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPages - 1) {
      if (range[range.length - 1] < totalPages - 2) {
        rangeWithDots.push('...', totalPages - 1);
      } else {
        rangeWithDots.push(totalPages - 1);
      }
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Hiển thị {startItem} - {endItem} trong tổng số {totalElements} kết quả
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}
          className="pagination-button"
          title="Trang đầu"
        >
          <ChevronsLeft size={16} />
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="pagination-button"
          title="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page !== 'number'}
            className={`pagination-button ${
              page === currentPage ? 'active' : ''
            } ${typeof page !== 'number' ? 'dots' : ''}`}
          >
            {typeof page === 'number' ? page + 1 : page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
          title="Trang sau"
        >
          <ChevronRight size={16} />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
          title="Trang cuối"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
