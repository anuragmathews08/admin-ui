import { useState, useCallback } from "react";

export const Pagination = () => {
  const [pageNumber, setPageNumber] = useState(new Array(5).fill(""));
  const [startPage, setStartPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback((pageNum) => {
    setCurrentPage(pageNum);
  }, []);

  const handleNextPageBtn = useCallback(() => {
    if (startPage + 4 < totalPages) {
      setStartPage((prev) => prev + 1);
    }
  }, [startPage, totalPages]);

  const handlePrevPageBtn = useCallback(() => {
    if (startPage > 1) {
      setStartPage((prev) => prev - 1);
    }
  }, [startPage]);

  const handleFirtPageBtn = useCallback(() => {
    setStartPage(1);
  }, []);

  const handleLastPageBtn = useCallback(() => {
    setStartPage(totalPages - 4);
  }, [totalPages]);

  return (
    <span className="flex items-center absolute left-[50%] -translate-x-[50%]">
      <button
        aria-details="First page"
        onClick={handleFirtPageBtn}
        disabled={startPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={startPage === 1 ? "black" : "white"}
          className="w-9 h-9 border rounded-full p-2"
          style={{
            backgroundColor: startPage === 1 ? "#cbcbcb" : "#68acf6",
            cursor: startPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        aria-details="Previous Page"
        className="ml-6 mr-2"
        onClick={handlePrevPageBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={startPage === 1 ? "black" : "white"}
          className="w-9 h-9 border rounded-full p-2"
          style={{
            backgroundColor: startPage === 1 ? "#cbcbcb" : "#68acf6",
            cursor: startPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      {pageNumber.map((pageNum, index) => {
        return (
          <button
            className="w-9 h-9 border rounded-full p-2 flex items-center justify-center mx-1.5"
            key={index}
            style={{
              backgroundColor:
                startPage + index === currentPage ? "white" : "#68acf6",
              borderColor:
                startPage + index === currentPage ? "#68acf6" : "#68acf6",
              color: startPage + index === currentPage ? "black" : "white",
            }}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </button>
        );
      })}
      <button
        aria-details="Next Page"
        className="mr-6 ml-2"
        onClick={handleNextPageBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={startPage === totalPages - 4 ? "black" : "white"}
          className="w-9 h-9 border rounded-full p-2"
          style={{
            backgroundColor:
              startPage === totalPages - 4 ? "#cbcbcb" : "#68acf6",
            cursor: startPage === totalPages - 4 ? "not-allowed" : "pointer",
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button aria-details="last Page" onClick={handleLastPageBtn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke={startPage === totalPages - 4 ? "black" : "white"}
          className="w-9 h-9 border rounded-full p-2"
          style={{
            backgroundColor:
              startPage === totalPages - 4 ? "#cbcbcb" : "#68acf6",
            cursor: startPage === totalPages - 4 ? "not-allowed" : "pointer",
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </span>
  );
};
