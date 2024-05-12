async function getInstagramFeed(accessToken) {
    return await fetch(`https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(data => data.data.slice(0, 15))
}


export async function onRequest(context) {
    return new Response(JSON.stringify({ "posts": await getInstagramFeed(context.env.INSTAGRAM_TOKEN) }))
}
