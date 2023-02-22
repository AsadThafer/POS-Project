import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./Table.css";

const Table = ({ data, itemsPerPage }) => {
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
          <ProductCard product={item} />
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Products</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="itemsPerPage">
              {" "}
              items Per Page : {itemsPerPage}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="itemsPerPage">
              {" "}
              Total Items : {totalItems}
            </td>
          </tr>
        </tfoot>
      </table>
      <ul className="pagination">{renderPagination()}</ul>
    </div>
  );
};

export default Table;
