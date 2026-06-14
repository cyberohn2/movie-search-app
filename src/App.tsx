import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
import HomePage from "./pages/home-page";
import Layout from "./components/layout";
import MovieList from "./pages/movie-list";
import MovieDetails from "./pages/movie-details";
import SearchPage from "./pages/search-page";

function App() {
  return (
    <main>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/now_playing"
              element={
                <MovieList
                  details={{ listName: "Now Playing", listType: "now_playing" }}
                />
              }
            />
            <Route
              path="/popular"
              element={
                <MovieList
                  details={{ listName: "Popular Movies", listType: "popular" }}
                />
              }
            />
            <Route
              path="/top_rated"
              element={
                <MovieList
                  details={{ listName: "Top Rated", listType: "top_rated" }}
                />
              }
            />
            <Route
              path="/upcoming"
              element={
                <MovieList
                  details={{ listName: "Upcoming Movies", listType: "upcoming" }}
                />
              }
            />
            <Route
              path="/movie"
              element={
                <MovieDetails />
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage />
              }
            />
            <Route path="*" element={<div>Not found</div>} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
