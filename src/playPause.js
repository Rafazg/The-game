const backgroundMusic = document.getElementById('background-music');
      const playPauseBtn = document.getElementById('play-pause-btn');

      playPauseBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
          backgroundMusic.play();
          playPauseBtn.src = "../assets/images/Muted.png"
        } else {
          backgroundMusic.pause();
          playPauseBtn.src = "../assets/images/Music.png"
        }
      });