import React from 'react';

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalRows, rowsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);


  let startPage = 1;
  let endPage = totalPages;
  const displayedPages = 3; 

  if (totalPages > displayedPages) {
    const halfDisplayed = Math.floor(displayedPages / 2);
    if (currentPage <= halfDisplayed + 1) {
      startPage = 1;
      endPage = displayedPages;
    } else if (currentPage + halfDisplayed >= totalPages) {
      startPage = totalPages - displayedPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfDisplayed;
      endPage = currentPage + halfDisplayed;
    }
  }

  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li className={`me-2 ${currentPage === number ? 'text-white' : 'text-gray-800'}`} key={number}>
        <button
          className={`px-3 py-1 ${currentPage === number ? 'bg-blue-700' : 'bg-gray-300'}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      </li>
    ));
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex">
        {currentPage > 1 && (
          <li className="me-2">
            <button
              className="px-3 py-1 bg-black text-white"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
        )}
        {renderPaginationNumbers()}
        {currentPage < totalPages && (
          <li className="me-2">
            <button
              className="px-3 py-1 bg-black text-white"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
