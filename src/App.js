import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LyricPage from "./components/page/LyricPage";
import HomePage from "./components/page/HomePage";
import Footer from "./components/Footer";
import ArtistProfile from "./components/ArtistProfile";
import SongCardContainer from "./components/SongCardContainer";
import ShareLayout from "./components/page/ShareLayout";
import ShowAllLyrics from "./components/ShowAllLyrics";
import AllArtistPage from "./components/page/AllArtistPage";
import NotFound from "./components/page/404";

import SongContext from "./Context";

import { useFetch } from "./components/CustomHook";
import { useState } from "react";

const songListUrl = "https://guitaristchord.com/api/songs";
function App() {
  const { loading, songData } = useFetch(songListUrl);
  const [hasFocus, setFocus] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <SongContext.Provider
      value={{ songData, loading, hasFocus, setFocus, query, setQuery }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShareLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/all-lyrics" element={<ShowAllLyrics />} />
            <Route path="/search" element={<ShowAllLyrics />} />
            <Route path="/lyric/:lyric/:name" element={<LyricPage />} />
            <Route path="/artist/:slug" element={<ArtistProfile />} />
            <Route path="/artists" element={<AllArtistPage />} />
            <Route path="/lyrics" element={<SongCardContainer />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </SongContext.Provider>
  );
}

export default App;
