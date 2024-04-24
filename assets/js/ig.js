// Replace with your Instagram Access Token
const accessToken = 'IGQWROS3FwZAFA2Q3Eyemd4cHBaV0hjT0x1RFV1N2ZAicTEybnlLVjFiNGI3U1RMZAHA1dEplOUVBMEhWaU9hN0dVNDhfaFJpbjU4cjNORDV2dWhQbjhkZAzIyU2dBM3NMSmcxbzBqeGpFMHNmYTVGM3kxMkU4bVZAILVkZD';

// Function to fetch and display Instagram feed
function getInstagramFeed() {
    fetch(`https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(data => data.data.slice(0, 15))
        .then(data => {
            const feedContainer = document.getElementById('ig-feed');

            var documentFragment = document.createDocumentFragment();

            data.forEach(post => {
                // TODO
                if (post.media_type == 'VIDEO')
                    return

                const postDiv = document.createElement('div');
                postDiv.classList.add("basis-1/4", "flex-none", "m-2", "max-w-40");

                const postLink = document.createElement('a');
                postLink.href = post.permalink;
                postLink.target = '_blank';

                const postImage = document.createElement('img');
                postImage.src = post.media_url;
                postImage.alt = post.caption;

                postDiv.appendChild(postLink);
                postLink.appendChild(postImage);
                documentFragment.appendChild(postDiv);
            });

            feedContainer.appendChild(documentFragment)
        });
}

// Call the function to fetch and display the Instagram feed
getInstagramFeed();
