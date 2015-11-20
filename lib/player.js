class Player {
  constructor(src) {
    var audio = document.createElement('audio');

    audio.src = src;
    this.src = src;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.pauseAudio();
  }

  stop() {
    this.pauseAudio(0);
  }

  pauseAudio(currentTime) {
    this.audio.pause();

    if (typeof currentTime !== 'undefined') {
      this.audio.currentTime = currentTime;
    }
  }
}

module.exports = Player;