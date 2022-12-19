import Loading from "./Loading";
import { Link } from "react-router-dom";
function SongList({ songData, loading }) {
  return (
    <div className="list-group my-5">
      <div className="list-group-item">
        <p className="mt-2">Lyrics</p>
        <hr />
        <div className="list-group list-group-flush ">
          {loading ? (
            <Loading />
          ) : (
            songData.map((song) => {
              return (
                <Link
                  key={song.id}
                  to={`/lyric/${song.slug}/${song.summary}`}
                  className="list-group-item list-group-item-action"
                >
                  <div className="row justify-content-sm-center">
                    <div className="col-md-2">
                      <img
                        className="img-fluid py-3"
                        src={require("./assets/p.jpg")}
                        alt="people"
                      />
                    </div>
                    <div className="col mt-2 me-2 p-3">
                      <p className="fs-5 m-0">{song.title}</p>
                      <p className="text-muted">{song.summary}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SongList;
