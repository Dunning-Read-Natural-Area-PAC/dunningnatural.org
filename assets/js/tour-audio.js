let markers;

const audioEl = document.getElementById("tour-audio");

function updatePositionState() {
    const positionState = {
        duration: audioEl.duration,
        playbackRate: audioEl.playbackRate,
        position: audioEl.currentTime,
    }

    if (audioEl.duration == Infinity) {
        return;
    }

    navigator.mediaSession.setPositionState(positionState);
}

if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => audioEl.play());
    navigator.mediaSession.setActionHandler('pause', () => audioEl.pause());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        audioEl.currentTime = details.seekTime;
    });

    audioEl.addEventListener("playing", (event) => {
        navigator.mediaSession.playbackState = "playing";
        updatePositionState()
    });

    audioEl.addEventListener("pause", () => {
        navigator.mediaSession.playbackState = "paused";
    });

    audioEl.addEventListener("durationchange", () => {
        updatePositionState()
    });
}

async function play(id) {
    id = typeof id == 'number' ? id : parseInt(id.dataset.markerId)
    const currentMedia = markers.find((o) => o.id == id)

    const response = await fetch(currentMedia.src);
    const blob = await response.blob()
    const objectURL = URL.createObjectURL(blob);

    audioEl.src = objectURL
    audioEl.play()

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata(currentMedia.metadata);
    }

    document.getElementById("now-playing").innerText = "Now playing: " + currentMedia.popup
}

async function init() {
    let data = await fetch("data.json");
    data = await data.json()
    markers = data.markers
}

init()

window.drnaAudioTour = {
    play
};
