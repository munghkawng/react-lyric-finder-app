import ArtistsCard from "../ArtistsCard";
import { useState, useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import Loading from "../Loading";

function AllArtistPage() {
  const [hasMore, setHasMore] = useState(true);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState({
    page: 1,
    pageSize: 10,
  });

  const getSongData = async () => {
    let showAllArtistUrl = `https://guitaristchord.com/api/artists?page=${controller.page}&page_size=${controller.pageSize}`;
    try {
      setLoading(true);
      const response = await axios(showAllArtistUrl);
      if (response.status === 200) {
        const { data } = response.data;
        console.log(data);
        setSongData((prevData) => {
          return [...new Set([...prevData, ...data])];
        });

        setController((prevData) => {
          return { ...prevData, page: prevData.page + 1 };
        });
        setHasMore(data.length > 0);
        setLoading(false);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSongData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row mb-5">
      <h1 className="my-5 ms-4 h4">Artists</h1>

      {songData.map((artist) => {
        return <ArtistsCard key={artist.id} {...artist} />;
      })}
      {loading && <Loading />}
      {!loading && hasMore && (
        <Stack
          direction="row"
          align="center"
          size="lg"
          justifyContent="center"
          mb={4}
        >
          <Button
            colorScheme="gray"
            onClick={getSongData}
            variant="solid"
            size="md"
            border="1px"
          >
            Load More
          </Button>
        </Stack>
      )}
    </div>
  );
}

export default AllArtistPage;
