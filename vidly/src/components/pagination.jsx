import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  state = {};
  render() {
    const { movies, moviesPerPage, onPageChange, currentPage } = this.props;
    console.log("currentPage: ", currentPage);

    let pages = Math.ceil(movies.length / moviesPerPage);
    if (pages === 1) return null;
    const pageArr = _.range(1, pages + 1);

    for (let i = 0; i < movies.length; i++) movies[i].like = false;

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageArr.map((page) => (
            <li key={page} className={this.getPageClass(page, currentPage)}>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  getPageClass(page, currentPage) {
    let className = "page-item";
    if (page === currentPage) className += " active";

    return className;
  }
}

Pagination.propTypes = {
  movies: PropTypes.array.isRequired,
  moviesPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
