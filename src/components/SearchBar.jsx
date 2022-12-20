import { FaBars } from "react-icons/fa";
import { useContext, useRef, useEffect, useState } from "react";
import SongContext from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SearchBar({ setShowLinks, showLinks }) {
  const { setFocus, query, setQuery } = useContext(SongContext);
  const inputContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);

  const navigate = useNavigate();
  let searchUrl = `https://guitaristchord.com/api/search/${query}`;

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios(searchUrl);
      setSearchData(data);
      setLoading(false);
    };

    getSearchData();
  }, [searchUrl]);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        console.log(inputContainerRef.current.contains(event.target));
        setFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [inputContainerRef, setFocus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length === 0) {
      return;
    } else {
      setFocus(false);
      setQuery("");
      navigate("/all-lyrics", { state: searchData, loading: loading });
    }
  };

  return (
    <>
      <form className="input-wrapper" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
          placeholder="Search Song Lyrics.."
          onFocus={() => setFocus(true)}
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
