import "./navbar.css";

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img
              className="logo"
              src={require("../components/assets/logo192.png")}
              alt="Logo"
            />
          </Link>

          {/* search bar */}
          <SearchBar setShowLinks={setShowLinks} showLinks={showLinks} />
        </div>

        {/* nav link */}
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <li>
              <Link to="/artists">Artists</Link>
            </li>

            <li>
              <Link to="/all-lyrics">Lyrics</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
