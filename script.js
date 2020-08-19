const input = document.getElementById('input');
const searchButton = document.getElementById('searchButton');
const searchResult = document.getElementById('search-result');
const getLyrics = document.getElementsByClassName("getLyrics");
const searchValue = input.value;

searchButton.addEventListener('click', function () {
    // console.log("clicked");
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
        .then(Response => Response.json())
        .then(data => OutputData(data))
    // console.log(data);
    // const title = data.data.map(song => song.title)
    // const artist = data.data.map(song => song.artist.name)
    // const album = data.data.map(song => song.album.title)
    // console.log(title);
    // console.log(artist);
    // console.log(album);
    function OutputData(data) {
        searchResult.innerHTML = `${data.data.map(song =>
            `        <div class="song-result row align-items-center my-3 p-3">

                <div class="col-md-9">
                    <h3>Title: ${song.title}</h3>
                    <p>Artist Name: ${song.artist.name}</p>
                    <p>Album: ${song.album.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button id="getLyrics"
                     class="btn btn-success" onclick="lyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
                </div>
            </div>`).join("")
            }
            `;
    }
})

function lyrics(artist, title) {
    const lyricsContainer = document.getElementById("song-lyrics")
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const p = document.createElement('p')
            p.innerHTML = `${data.lyrics}`
            lyricsContainer.appendChild(p)
            console.log(p);
        })

}



