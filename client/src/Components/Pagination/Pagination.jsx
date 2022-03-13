import React from "react";
import "./Pagination.css";
export default function Pagination({
  countriesPerPage,
  pagination,
  allCountries,
  page,
}) {
  let pageNum = [];
  const total = Math.ceil(allCountries / countriesPerPage);

  for (let i = 1; i <= total; i++) {
    pageNum.push(i);
  }

  return (
    <>
      <div className="page">
        <h1>Page: {page}</h1>
      </div>
      <div className="container-pagination">
        {pageNum?.map((e) => (
          <span key={e} className="pagination">
            <button className="active" onClick={() => pagination(e)}>
              {e}
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
