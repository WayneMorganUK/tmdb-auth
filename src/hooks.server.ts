import type { HandleFetch } from '@sveltejs/kit';
import { PUBLIC_TMDB_BEARER_TOKEN } from '$env/static/public';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
    // console.log("init request", request)
    // console.log("adding bearer token")
    if (request.url.startsWith('https://api.themoviedb.org/')) {
        // clone the original request, but set the authorization header
        request = new Request(
            request.url,
            {
                ...request,
                headers: {
                    ...request.headers,
                    Authorization: `Bearer ${PUBLIC_TMDB_BEARER_TOKEN}`
                }
            }
        );
        // console.dir({ request })
    }
    return fetch(request);
}
