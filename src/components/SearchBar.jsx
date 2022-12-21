import { FaBars } from "react-icons/fa";
import { useContext, useRef, useEffect } from "react";
import SongContext from "../Context";

import { useNavigate } from "react-router-dom";
import { useQuery } from "../QueryCustomHook";

function SearchBar({ setShowLinks, showLinks }) {
  const { setFocus, query, setQuery } = useContext(SongContext);

  const inputContainerRef = useRef(null);

  const { loading, queryData, error } = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [inputContainerRef, setFocus]);

  const handleFocusInput = () => {
    setFocus(true);
    // navigate("/search");
  };

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate("/search", { state: queryData, loading: loading, error: error });
  };

  return (
    <>
      <form className="input-wrapper" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleOnChange}
          className="input"
          placeholder="Search Song Lyrics.."
          onFocus={handleFocusInput}
          ref={inputContainerRef}
        />
        <button type="submit" className="d-none"></button>
        <div className="fa-solid fa-magnifying-glass search-icon"></div>
      </form>

      <button className="nav-toggle" onClick={() => setShowLinks(!showLinks)}>
        <FaBars />
      </button>
    </>
  );
}

export default SearchBar;
