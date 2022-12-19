import SongCardContainer from "../SongCardContainer";
import ArtistCardContainer from "../ArtistCardContainer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h5 className="fw-bold mt-5">What's hot</h5>
      <p>See which lyric is trending</p>
      <SongCardContainer />
      <div className="d-flex justify-content-between align-items-center my-3">
        <h5 className="fw-bold">Latest Lyrics</h5>
        <Link
          to="all-lyrics"
          className="bg-secondary text-decoration-none  rounded-5 text-light px-3 py-1"
        >
          See All
        </Link>
      </div>
      <SongCardContainer />
      <div className="d-flex justify-content-between align-items-center my-3">
        <h5 className="fw-bold">Artists</h5>
        <Link
          to="/artists"
          className="bg-secondary text-decoration-none  rounded-5 text-light px-3 py-1"
        >
          See All
        </Link>
      </div>
      <ArtistCardContainer />
    </>
  );
}

export default HomePage;
