

import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ fetch }) => {
        const newTokenRequest = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
            method: 'POST',
        })

        const response = await newTokenRequest.json()
        const REQUEST_TOKEN = response.request_token

        redirect(303, `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=http://localhost:5173/`)


    }
}
