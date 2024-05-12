// Function to fetch and display Instagram feed
function getInstagramFeed() {
    fetch(`/recent-instagram-posts`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(data => data.posts)
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
