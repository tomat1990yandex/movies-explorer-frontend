export default function filterShortMovies(data) {
  return data.filter((el) => {
    const {duration = 0} = el;
    return duration <= 40;
  });
}
