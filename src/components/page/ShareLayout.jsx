import Navbar from "../NavBar";
import { Outlet, Link } from "react-router-dom";

import { useContext } from "react";
import SongContext from "../../Context";
import Loading from "../Loading";
import { useFetch } from "../CustomHook";

function ShareLayout() {
  const { query, setQuery, setFocus } = useContext(SongContext);

  let searchUrl = `https://guitaristchord.com/api/search/${query}`;
  const { loading, songData } = useFetch(searchUrl);

  const handleSearchItemClick = () => {
    setFocus(false);
    setQuery("");
  };
  return (
    <>
      <Navbar />

      <div className="container searchbox-container">
        <div
          className={`${query.trim() ? "data-result" : "data-result-display"}`}
        >
          <ul className="search-links">
            {loading ? (
              <Loading />
            ) : (
              songData.map((query) => {
                return (
                  <li key={query.id}>
                    <Link
                      to={`/lyric/${query.slug}/${query.summary}`}
                      className="links-item"
                      onClick={handleSearchItemClick}
                    >
                      <span className="text-black">{query.title}</span> -{" "}
                      <span className="text-danger">{query.summary}</span>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ShareLayout;
