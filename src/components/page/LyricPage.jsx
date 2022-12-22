import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";

import { useEffect, useState } from "react";
import axios from "axios";
import LyricPageImage from "../assets/cover.png";

function LyricPage() {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chordLyric, setChordLyric] = useState("");

  const para = useParams();
  const { lyric } = para;

  const individualSongUrl = `https://guitaristchord.com/api/songs/${lyric}`;

  useEffect(() => {
    const fetchRequestedSong = async () => {
      try {
        const { data } = await axios.get(individualSongUrl);
        if (data) {
          setSong(data);
          setLoading(false);

          let s = data.body.replace(/\[_/g, "<span class='chord-inline'>");
          s = s.replace(/\[/g, "<span class='chord'>");
          s = s.replace(/\]/g, "</span>");
          s = s.replace(/[ ]/g, " &nbsp; ");
          setChordLyric(s);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRequestedSong();
  }, [individualSongUrl]);

  return (
    <>
      <div className="card border-0   my-5">
        <div className="row align-items-center">
          <div className="col-md-2 d-none d-sm-block">
            {loading ? (
              <Loading />
            ) : (
              <img
                src={LyricPageImage}
                className="rounded-1  mx-auto border"
                alt={song.summary}
                style={{ width: "200px" }}
              />
            )}
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="lead">lyrics</p>
              <h1 className="card-title">
                {loading ? <Loading /> : song.title}
              </h1>
              {loading ? (
                <Loading />
              ) : (
                <Link
                  to={`/artist/${song.tags[0].slug}`}
                  className="card-text py-2 link-danger"
                >
                  {song.summary}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-5 fs-5">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="song-container"
              dangerouslySetInnerHTML={{ __html: chordLyric }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LyricPage;
