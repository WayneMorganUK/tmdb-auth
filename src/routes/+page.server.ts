export const actions = {
    default: async ({ fetch, url }) => {
        const request_token = url.searchParams.get("request_token")
        const approved = url.searchParams.get("approved")

        if (request_token && approved) {
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ request_token: request_token })
            };

            const response = await fetch(
                "https://api.themoviedb.org/3/authentication/session/new",
                options
            );
            const res = await response.json();
            console.log({ res });

            return res.session_id
        }
    }
}
