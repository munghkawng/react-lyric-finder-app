import SongCard from "./SongCard";
import { useContext } from "react";
import SongContext from "../Context";
import Loading from "./Loading";
function SongCardContainer() {
  const { loading, songData } = useContext(SongContext);
  const { data } = songData;

  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : (
        data.map((song) => {
          return <SongCard key={song.id} {...song} />;
        })
      )}
    </div>
  );
}

export default SongCardContainer;
