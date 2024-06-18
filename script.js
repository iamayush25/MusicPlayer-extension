document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search";
  const apiKey = "a30104380cmsh9540154b3e422e6p1bbe00jsn7f0be4b7b67a";

  // Function to update UI with track details
  function updateTrackDetails(track) {
    document.getElementById("singer").textContent = track.artist.name;
    document.getElementById("musictitle").textContent = track.title;
    document.getElementById("audiosource").src = track.preview;
    document.getElementById("songImage").src =
      track.album.cover_medium || "default-image.jpg";
    document.getElementById("myaudio").load(); // Reload audio element to play new track
    playAudio(); // Play the audio automatically when loaded
  }

  // Function to handle errors and reset UI
  function handleErrors() {
    document.getElementById("musictitle").textContent = "Music not found";
    document.getElementById("singer").textContent = "";
    document.getElementById("audiosource").src = "";
    document.getElementById("songImage").src = "Image/musicError.jpg"; // Default image if no track found
    pauseAudio(); // Pause audio if nothing found
  }

  // Function to play audio
  function playAudio() {
    document.getElementById("myaudio").play();
  }

  // Function to pause audio
  function pauseAudio() {
    document.getElementById("myaudio").pause();
  }

  // Event listener for search button click
  document.getElementById("btn").addEventListener("click", async function () {
    const songName = document.querySelector("#text").value.trim();
    if (!songName) {
      alert("Please enter a song name.");
      return;
    }
    const url = `${apiUrl}?q=${encodeURIComponent(songName)}`;
    try {
      const response = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      });
      if (!response.ok) {
        throw new Error("Network Error.");
      }
      const data = await response.json();

      if (data.data.length > 0) {
        updateTrackDetails(data.data[0]);
      } else {
        handleErrors();
      }
      document.getElementById("error").textContent = "";
    } catch (error) {
      console.error("Error fetching data:", error);
      handleErrors();
      document.getElementById("error").textContent =
        "Something went wrong. Please try again later.";
    }
  });
});
