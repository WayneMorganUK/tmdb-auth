import { json } from "@sveltejs/kit";


export async function POST({ fetch, request }) {
    const request_token = await request.json();
    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({ request_token: request_token })
    };

    const response = await fetch(
        'https://api.themoviedb.org/3/authentication/session/new',
        options
    );

    // console.dir(response, { depth: null });
    const res = await response.json();
    console.log({ res });
    return json(res)
}
