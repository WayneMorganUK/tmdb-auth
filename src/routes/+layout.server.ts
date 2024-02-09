import { error } from '@sveltejs/kit'
export const load = async ({ fetch }) => {
    const GENRES_TV_API = `https://api.themoviedb.org/3/genre/tv/list?language=en`
    const GENRES_MOVIE_API = `https://api.themoviedb.org/3/genre/movie/list?language=en`


    const genres = [
        fetch(GENRES_TV_API),
        fetch(GENRES_MOVIE_API)
    ]

    try {
        // use Promise.all to wait for all promises to resolve
        const responses = await Promise.all(genres);

        // check if all responses are ok
        if (responses.every(res => res.ok)) {
            // convert responses to JSON
            const [tv_genre, movie_genre] = await Promise.all(
                responses.map(res => res.json().then(res => res.genres))
            );

            // return the data as props
            return {
                tv_genre,
                movie_genre

            }
        } else {
            // throw an error if any response is not ok
            error(401, "Failed to fetch data");
        }
    } catch {
        error(404, 'network error, genres request failed')
    }
}



