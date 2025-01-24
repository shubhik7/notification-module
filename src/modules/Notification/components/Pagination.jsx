import "./Pagination.css";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <VscArrowLeft />
      </button>
      <span>{`${currentPage}/${totalPages}`}</span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <VscArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
