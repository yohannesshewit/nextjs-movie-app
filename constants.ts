const API_URL = "https://api.themoviedb.org/3";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

export { API_URL, IMAGE_PATH };


// api.themoviedb.org =server
// 3. =API version

//t =image type system (TMDb internal path)
//p =poster images
//w500 =image size

{/*
u can use at component image section like this 


<Image
  src={
    movie.poster_path
      ? `${IMAGE_PATH}${movie.poster_path}`
      : "/fallback.jpg"
  }
/>


*/}

{/*  simple way better
export const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

export const getImageUrl = (path: string | null) =>
  path ? `${IMAGE_PATH}${path}` : "/fallback.jpg";

then write like this in component 

<Image src={getImageUrl(movie.poster_path)} />

*/}