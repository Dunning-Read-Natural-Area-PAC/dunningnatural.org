async function getInstagramFeed(accessToken) {
    var response = await fetch(`https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)

    var body = await response.text()

    if (!response.ok) {
        throw ("Issue fetching from Instagram. Response code " + response.status + ". Body: " + JSON.stringify(body))
    }

    return JSON.parse(body).data.slice(0, 15)
}

function cache_headers() {
    const result = new Headers();
    result.append("Cache-Control", "public, immutable, max-age=3600");
    return result
}

export async function onRequest(context) {
    var token = context.env.INSTAGRAM_TOKEN

    if (!token) {
        console.warn("Token could not be read from environment. Call to get content will fail.")
    }

    var posts = await getInstagramFeed(context.env.INSTAGRAM_TOKEN)

    var response_options = {
        headers: cache_headers()
    }

    return new Response(JSON.stringify({ posts }), response_options)
}
