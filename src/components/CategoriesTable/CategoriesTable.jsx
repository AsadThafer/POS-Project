import { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "../Table/Table.css";

const CategoriesTable = ({ data }) => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalItems = data.length;

  const handleClick = (page) => setCurrentPage(page);

  const renderTableData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const rows = [];

    for (let i = start; i < end; i += 3) {
      const row = data.slice(i, i + 3).map((item) => (
        <td key={item.id}>
          <CategoryCard category={item} />
        </td>
      ));

      rows.push(<tr key={i / 3}>{row}</tr>);
    }

    return rows;
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <button onClick={() => handleClick(i)}>{i}</button>
        </li>
      );
    }

    return pages;
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
  };

  const renderItemsPerPageOptions = () => {
    const options = [6, 12, 18];
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Categories</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="itemsPerPage">
              <label htmlFor="itemsPerPage">Items per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {renderItemsPerPageOptions()}
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="itemsPerPage">
              Total Displayed Items : {totalItems}
            </td>
          </tr>
        </tfoot>
      </table>
      <ul className="pagination">{renderPagination()}</ul>
    </div>
  );
};

export default CategoriesTable;
