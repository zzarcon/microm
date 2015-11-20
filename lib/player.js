/**
 * DOCS...
 */
import {capitalize} from './utils';

const eventNames = ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'];

class Player {
  constructor(src) {
    var audio = document.createElement('audio');

    audio.src = src;

    this.isLoaded = false;
    this.isPlaying = false;
    this.isStoped = true;
    this.duration = 0;
    this.currentTime = 0;
    this.audio = audio;
    this.addEvents();
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
      this.currentTime = currentTime;
    }
  }

  addEvents() {
    var audio = this.audio;
    this.pauseAudio(0);

    eventNames.forEach((name) => {
      let handlerName = "on" + capitalize(name);
      audio.addEventListener(name, this[handlerName].bind(this));
    });
  }

  //
  // Event handlers
  // 
  onLoadedmetadata() {
    this.isLoaded = true;
    this.duration = this.audio.duration;
  }

  onTimeupdate() {
    this.currentTime = this.audio.currentTime;
  }

  onPlay() {
    this.isPlaying = true;
    this.isStoped = false;
  }

  onPause() {
    this.isPlaying = false;
  }

  onEnded() {
    this.isPlaying = false;
    this.isStoped = true;
  }
}

module.exports = Player;