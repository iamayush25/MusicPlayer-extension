document.addEventListener("DOMContentLoaded", function () {
    // Function to update UI with track details and image
    function updateTrackDetails(track) {
      document.getElementById("singer").textContent = track.artist.name;
      document.getElementById("musictitle").textContent = track.title;
      document.getElementById("audiosource").src = track.preview;
      
      // Set song image with fallback to default image
      let songImage = document.getElementById("songImage");
      songImage.src = track.album.cover_medium || 'default-image.jpg';
      songImage.onerror = function() {
        this.src = 'default-image.jpg'; 
      };
  
      document.getElementById("myaudio").load(); // Reload audio element to play new track
      playAudio(); // Play the audio automatically when loaded
    }
  
    // Function to fetch and display song details
    document.getElementById("btn").addEventListener("click", function () {
      let songName = document.querySelector("#text").value.trim();
      if (songName === "") {
        alert("Please enter a song name.");
        return;
      }
  
      let url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
        songName
      )}`;
      let headers = {
        "X-RapidAPI-Key": "a30104380cmsh9540154b3e422e6p1bbe00jsn7f0be4b7b67a",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      };
  
      fetch(url, { headers })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length > 0) {
            let track = data.data[0];
            updateTrackDetails(track);
          } else {
            document.getElementById("musictitle").textContent = "Music not found";
            document.getElementById("singer").textContent = "";
            document.getElementById("audiosource").src = "";
            document.getElementById("songImage").src = "default-image.jpg"; // Default image if no track found
            pauseAudio(); // Pause audio if nothing found
          }
          document.getElementById("error").textContent = "";
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          document.getElementById("error").textContent =
            "Something went wrong. Please try again later.";
          document.getElementById("musictitle").textContent = "";
          document.getElementById("singer").textContent = "";
          document.getElementById("audiosource").src = "";
          document.getElementById("songImage").src = "alt-music-image"; // Default image on error
          pauseAudio(); // Pause audio on error
        });
    });
  
    // Function to play audio
    function playAudio() {
      let audio = document.getElementById("myaudio");
      audio.play();
    }
  
    // Function to pause audio
    function pauseAudio() {
      let audio = document.getElementById("myaudio");
      audio.pause();
    }
  });
  