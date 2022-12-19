import "./songcard.css";
import songCardImage from "./assets/cover.png";
import { Link } from "react-router-dom";
function SongCard({ title, slug, summary }) {
  return (
    <div className="col-md-2 col-6 song-card-container">
      <div className="card border-0">
        <img
          src={songCardImage}
          className="card-img-top rounded-4 mt-2"
          alt="pp"
        />
        <div className="card-body d-grid">
          <Link
            to={`/lyric/${slug}/${summary}`}
            className=" text-black btn-link stretched-link"
          >
            {title}
          </Link>
          <p className=" card-text text-muted  btn-link">{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
