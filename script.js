
async function searchYouTube() {
    const query = document.getElementById('searchQuery').value.trim();
    const resultsDiv = document.getElementById('results');

    if (!query) {
        resultsDiv.innerHTML = "Please enter a search term.";
        return;
    }

    resultsDiv.innerHTML = "Loading...";

    const url = `https://youtube138.p.rapidapi.com/search/?q=${encodeURIComponent(query)}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1b184ba5f2mshe43dfa3905b2ae0p1f5623jsn169be0816264',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                resultsDiv.innerHTML = "Error fetching data.";
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.contents || data.contents.length === 0) {
                resultsDiv.innerHTML = "No videos found.";
                return;
            }

            resultsDiv.innerHTML = ""; 
            data.contents.forEach(item => {
                if (item.video) { 
                    const video = item.video;
                    const videoElement = `
                        <div class="video">
                            <iframe width="360" height="202" src="https://www.youtube.com/embed/${video.videoId}" 
                                frameborder="0" allowfullscreen></iframe>
                            <p>${video.title}</p>
                        </div>
                    `;
                    resultsDiv.innerHTML += videoElement;
                }
            });
        })
        .catch(error => {
            resultsDiv.innerHTML = "Error fetching data.";
            console.error("Fetch error:", error);
        });
}

