import { Link } from "react-router-dom";
function ArtistsCard({ name, slug }) {
  return (
    <div className="col-md-2 col-6 col-sm-6">
      <div className="card border-0 mb-3">
        <img
          src={require("../components/assets/cover.png")}
          className="card-img-top rounded-circle mx-auto shadow-lg"
          alt="artist"
          style={{ height: "170px", width: "170px" }}
        />
        <div className="card-body text-center">
          <Link
            to={`/artist/${slug}`}
            className="card-text btn-link text-black text-capitalize stretched-link"
          >
            {name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtistsCard;
