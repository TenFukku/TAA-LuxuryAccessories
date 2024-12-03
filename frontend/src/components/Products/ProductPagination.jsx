import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import "style/components/Products/ProductPagination.scss";

function ProductPagination({ totalPages, activePage, onPageChange }) {
  const renderPaginationItems = () => {
    const items = [];

    // Nút trang đầu tiên
    items.push(<Pagination.First key="first" onClick={() => onPageChange(1)} disabled={activePage === 1} />);

    // Nút trang trước
    items.push(<Pagination.Prev key="prev" onClick={() => onPageChange(activePage - 1)} disabled={activePage === 1} />);

    // Trang đầu tiên
    items.push(
      <Pagination.Item key={1} active={1 === activePage} onClick={() => onPageChange(1)}>
        {1}
      </Pagination.Item>
    );

    // Các trang trước trang hiện tại
    for (let i = Math.max(activePage - 1, 2); i < activePage; i++) {
      items.push(
        <Pagination.Item key={i} onClick={() => onPageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Trang hiện tại
    if (activePage !== 1 && activePage !== totalPages) {
      items.push(
        <Pagination.Item key={activePage} active>
          {activePage}
        </Pagination.Item>
      );
    }

    // Các trang sau trang hiện tại
    for (let i = activePage + 1; i <= Math.min(activePage + 3, totalPages - 1); i++) {
      items.push(
        <Pagination.Item key={i} onClick={() => onPageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    // Trang cuối cùng
    items.push(
      <Pagination.Item key={totalPages} active={totalPages === activePage} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );

    // Nút trang tiếp theo
    items.push(<Pagination.Next key="next" onClick={() => onPageChange(activePage + 1)} disabled={activePage === totalPages} />);

    // Nút trang cuối cùng
    items.push(<Pagination.Last key="last" onClick={() => onPageChange(totalPages)} disabled={activePage === totalPages} />);

    return items;
  };

  return (
    <Pagination className="mt-3 justify-content-center">
      {renderPaginationItems()}
    </Pagination>
  );
}

export default ProductPagination;