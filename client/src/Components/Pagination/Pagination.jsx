import React from "react";
import "./Pagination.css";
export default function Pagination({
  countriesPerPage,
  pagination,
  allCountries,
  page,
  setPage,
}) {
  let pageNum = [];
  const total = Math.ceil(allCountries / countriesPerPage);

  for (let i = 1; i <= total; i++) {
    pageNum.push(i);
  }

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Page: {page}</h1>
      </div>
      <div className="container-pagination">
        <button className="navigation" id="prev" onClick={prevPage}>
          prev
        </button>
        {pageNum?.map((e) => (
          <span key={e} className="pagination">
            <button className="active" onClick={() => pagination(e)}>
              {e}
            </button>
          </span>
        ))}
        <button className="navigation" id="next" onClick={nextPage}>
          next
        </button>
      </div>
    </>
  );
}
