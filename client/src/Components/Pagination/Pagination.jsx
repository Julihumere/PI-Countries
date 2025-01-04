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
      <div className="container-pagination">
        <button className="navigation" id="prev" onClick={prevPage}>
          {"<"}
        </button>
        {pageNum?.map((e) => (
          <span key={e} className="pagination">
            <button
              className="active"
              style={{
                backgroundColor: page === e ? "white" : "midnightblue",
                color: page === e ? "midnightblue" : "white",
                fontWeight: page === e ? "bold" : "normal",
                scale: page === e ? "1.1" : "1",
              }}
              onClick={() => pagination(e)}
            >
              {e}
            </button>
          </span>
        ))}
        <button className="navigation" id="next" onClick={nextPage}>
          {">"}
        </button>
      </div>
    </>
  );
}
