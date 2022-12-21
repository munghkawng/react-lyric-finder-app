import { Link } from "react-router-dom";
import Loading from "../Loading";
import ImagePath from "../assets/logo192.png";
function SearchPage({ searchData, loading }) {
  if (searchData.length === 0) {
    return (
      <div className="card my-4">
        <div className="card-header">
          <h3> Search Lyrics</h3>
        </div>

        <ul className="list-group list-group-flush ">
          {loading ? (
            <Loading />
          ) : (
            <h1 className="ms-3 my-5 text-danger">NOT FOUND</h1>
          )}
        </ul>
      </div>
    );
  } else {
    return (
      <>
        <div className="card my-4">
          <div className="card-header">
            <h3> Search Lyrics</h3>
          </div>

          <ul className="list-group list-group-flush ">
            {loading ? (
              <Loading />
            ) : (
              searchData.map((song, index) => {
                return (
                  <li className="list-group-item" key={song.id}>
                    <div className="card mb-3 border-0 ">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-1 col-1 d-flex">
                          <span className="pe-4 text-muted my-auto">
                            {index + 1}
                          </span>
                          <img
                            src={ImagePath}
                            className="img-thumbnail"
                            alt="..."
                            style={{ width: "90px" }}
                          />
                        </div>
                        <div className="col-md-8 col-8 ms-5">
                          <div className="card-body">
                            <Link
                              to={`/lyric/${song.slug}/${song.summary}`}
                              className="card-title h6  text-black"
                            >
                              {song.title}
                            </Link>
                            <Link
                              to={`/artist/${song.tags[0].slug}`}
                              className="card-text text-muted mt-1 d-block"
                            >
                              {song.summary}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default SearchPage;
