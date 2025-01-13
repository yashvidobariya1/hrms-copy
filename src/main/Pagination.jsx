import React from "react";
import "./Pagination.css";
import { MdArrowBackIosNew, MdOutlineNavigateNext } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="Action-button"
      >
        <MdArrowBackIosNew />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : "pagination-number"}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="Action-button"
      >
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
};

export default Pagination;
