import { useState, useCallback, useEffect } from "react";
import { SET_CURRENT_PAGE, SET_START_PAGE } from "../actionTypes";

export const Pagination = ({ userData, dispatch }) => {
  const [pageNumber, setPageNumber] = useState(
    new Array(userData.pages).fill("")
  );
  const [startPage, setStartPage] = useState(userData.startPage);
  const [totalPages, setTotalPages] = useState(userData.pages);
  const [currentPage, setCurrentPage] = useState(userData.currentPage);

  useEffect(() => {
    setStartPage(userData.startPage);
  }, [userData.startPage]);

  useEffect(() => {
    setCurrentPage(userData.currentPage);
  }, [userData.currentPage]);

  useEffect(() => {
    setTotalPages(userData.pages);
    setPageNumber(new Array(userData.pages).fill(""));
  }, [userData.pages]);

  useEffect(() => {
    dispatch({
      type: SET_START_PAGE,
      payload: startPage,
    });
  }, [startPage]);

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    });
  }, [currentPage]);

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
    if (startPage > 1) {
      setStartPage(1);
    }
  }, [startPage]);

  const handleLastPageBtn = useCallback(() => {
    if (startPage + 4 < totalPages) {
      setStartPage(totalPages - 4);
    }
  }, [totalPages, startPage]);

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
