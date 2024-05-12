async function getInstagramFeed(accessToken) {
    var response = await fetch(`https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)

    var body = await response.json()

    if (!response.ok) {
        throw ("Issue fetching from Instagram" + JSON.stringify(body))
    }

    return body.data.slice(0, 15)
}

function cache_headers() {
    const result = new Headers();
    result.append("Cache-Control", "public, immutable, max-age=3600");
    return result
}

export async function onRequest(context) {
    var posts = await getInstagramFeed(context.env.INSTAGRAM_TOKEN)

    var response_options = {
        headers: cache_headers()
    }

    return new Response(JSON.stringify({ posts }), response_options)
}
