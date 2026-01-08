const songcont = document.getElementById("songs-list");
const searchbtn = document.getElementById("sbtn");
const searchInput = document.getElementById("search");

function fetchSongs(term) {
  const url = `https://itunes.apple.com/search?media=music&limit=12&term=${term}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      songcont.innerHTML = "";

      data.results.forEach(result => {
        const article = document.createElement("article");
        article.className = "card shadow-sm p-3 mb-3";

        const img = document.createElement("img");
        img.src = result.artworkUrl100;

        const details = document.createElement("div");

        const artist = document.createElement("p");
        artist.innerHTML = `<strong>${result.artistName}</strong>`;

        const song = document.createElement("p");
        song.innerHTML = result.trackName;

        const audio = document.createElement("audio");
        audio.controls = true;

        const source = document.createElement("source");
        source.src = result.previewUrl;

        audio.appendChild(source);

        details.appendChild(artist);
        details.appendChild(song);
        details.appendChild(audio);

        article.appendChild(img);
        article.appendChild(details);

        songcont.appendChild(article);
      });
    })
    .catch(error => console.log(error));
}
window.addEventListener("load", () => {
  fetchSongs("popular");
});

// Search button
searchbtn.addEventListener("click", e => {
  e.preventDefault();

  const term = searchInput.value.trim();
  if (!term) {
    alert("Please enter a search term");
    return;
  }

  fetchSongs(term);
});
document.addEventListener(
  "play",
  event => {
    const audios = document.getElementsByTagName("audio");
    for (let i = 0; i < audios.length; i++) {
      if (audios[i] !== event.target) {
        audios[i].pause();
      }
    }
  },
  true
);
