import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    allMovies: [],
    allGenres: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    const allGenres = { _id: "", name: "All Genres" };
    const genres = [allGenres, ...getGenres()];
    const movies = getMovies();

    for (let i = 0; i < movies.length; i++) movies[i].like = false;

    this.setState({
      movies: movies,
      genres: genres,
      allMovies: movies,
      selectedGenre: allGenres,
      allGenres: allGenres,
    });
  }

  handleDelete = (movie) => {
    const newMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: newMovies });
  };

  handleLike = (movie) => {
    console.log("Heart clicked for movie", movie);
    const index = this.state.movies.indexOf(movie);
    const movies = this.state.movies;
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, selectedGenre, allMovies, sortColumn } =
      this.state;

    console.log("sortColumn", sortColumn);

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movieCount = sorted.length;
    if (movieCount === 0) return <p>There are no movies in the database</p>;

    const pageMovies = paginate(sorted, currentPage, pageSize, selectedGenre);

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>

            <div className="col">
              <p>There are {movieCount} movies in the database.</p>

              <MoviesTable
                movies={pageMovies}
                sortColumn={sortColumn}
                pageMovies={pageMovies}
                onDelete={this.handleDelete}
                onHeart={this.handleLike}
                onSort={this.handleSort}
              />

              <Pagination
                movies={filtered}
                moviesPerPage={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
