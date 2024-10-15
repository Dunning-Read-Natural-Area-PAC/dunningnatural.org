const markers = [
    {
        id: 1,
        latlng: [41.954111, -87.796750],
        popup: "Nesewin",
        src: "markers/1/audio.mp3",
        metadata: {
            title: 'Nesewin - How to Breathe Underwater',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/1/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 2,
        latlng: [41.953722, -87.796806],
        popup: "Time travel to the future",
        src: "markers/2/audio.mp3",
        metadata: {
            title: 'Time travel to the future',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/2/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 3,
        latlng: [41.952917, -87.797583],
        popup: "Going with the flow",
        src: "markers/3/audio.mp3",
        metadata: {
            title: 'Going with the flow',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/3/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 4,
        latlng: [41.952972, -87.800167],
        popup: "The community saves a treasure",
        src: "markers/4/audio.mp3",
        metadata: {
            title: 'The community saves a treasure',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/4/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 5,
        latlng: [41.953306, -87.801472],
        popup: "Many hands, but still heavy work",
        src: "markers/5/audio.mp3",
        metadata: {
            title: 'Many hands, but still heavy work',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/5/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 7,
        latlng: [41.953972, -87.802056],
        popup: "Giving back",
        src: "markers/7/audio.mp3",
        metadata: {
            title: 'Giving back',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/7/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    },
    {
        id: 8,
        latlng: [41.954111, -87.801472],
        popup: "Time travel to the distant past",
        src: "markers/8/audio.mp3",
        metadata: {
            title: 'Time travel to the distant past',
            artist: 'Dunning Read Natural Area',
            artwork: [
                {
                    src: 'markers/8/landscape.png',
                    type: 'image/png'
                },
            ]
        }
    }
]

let sound;

const updatePositionState = function() {
    const positionState = {
        duration: sound.duration(),
        playbackRate: sound.rate(),
        position: sound.seek(),
    }

    console.log(positionState)

    navigator.mediaSession.setPositionState(positionState);
}

const play = async function (id) {
    const currentMedia = drnaAudioTour.markers.find((o) => o.id == id)

    const response = await fetch(currentMedia.src);
    const blob = await response.blob()
    const objectURL = URL.createObjectURL(blob);

    if (sound) {
        sound.pause()
    }

    sound = new Howl({
        src: [objectURL],
        html5: true,
        format: ['mp3'],
    });
    sound.play()

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata(currentMedia.metadata);
    }
}



if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => sound.play());
    navigator.mediaSession.setActionHandler('pause', () => sound.pause());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        sound.seek(details.seekTime)
    });
}

window.drnaAudioTour = {
    markers,
    play
};
