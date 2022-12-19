export const paginate = (songs) => {
  const itemPerPage = 10;

  const numberOfPages = Math.ceil(songs.length / itemPerPage);

  const newSongs = Array.from({ length: numberOfPages }, (v, index) => {
    const start = index * itemPerPage;
    return songs.slice(start, start + itemPerPage);
  });

  return newSongs;
};
