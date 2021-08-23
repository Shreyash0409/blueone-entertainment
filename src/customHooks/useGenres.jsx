//* Converting the genres arrray to the string format
const useGenres = (selectedChips) => {
  if (selectedChips.length < 1) return "";
  const genreId = selectedChips.map((selected) => selected.id);
  return genreId.reduce((acc, curr) => acc + "," + curr);
};
export default useGenres;

//For Instance: [34,12,28,90] -> "34,12,28,90"
