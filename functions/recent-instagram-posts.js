async function getInstagramFeed(accessToken) {
    var response = await fetch(`https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)

    var body = await response.json()

    if (!response.ok) {
        throw ("Issue fetching from Instagram" + JSON.stringify(body))
    }

    return body.data.slice(0, 15)
}

export async function onRequest(context) {
    var posts = await getInstagramFeed(context.env.INSTAGRAM_TOKEN)
    return new Response(JSON.stringify({ posts }))
}
