/**
 * DOCS...
 */
import {capitalize} from './utils';

const eventNames = ['loadedmetadata', 'timeupdate', 'play', 'pause', 'ended'];

class Player {
  /**
   * @param  {String} src    
   * @param  {Object} microm Microm instance
   * @return {void}
   */
  constructor(src, microm) {
    var audio = document.createElement('audio');

    audio.src = src;

    this.microm = microm;
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

    eventNames.forEach((name) => {
      let handlerName = "on" + capitalize(name);
      audio.addEventListener(name, this[handlerName].bind(this));
    });
  }

  fireEvent(eventName, data) {
    var handler = this.microm.eventListeners[eventName];

    handler && handler(data);
  }
  
  //
  // Event handlers
  // 
  onLoadedmetadata() {
    this.isLoaded = true;
    this.duration = this.audio.duration;

    this.fireEvent('loadedmetadata', this.duration);
  }

  onTimeupdate() {
    this.currentTime = this.audio.currentTime;

    this.fireEvent('timeupdate', this.currentTime);
  }

  onPlay() {
    this.isPlaying = true;
    this.isStoped = false;

    this.fireEvent('play');
  }

  onPause() {
    this.isPlaying = false;

    this.fireEvent('pause', this.currentTime);
  }

  onEnded() {
    this.isPlaying = false;
    this.isStoped = true;

    this.fireEvent('ended');
  }
}

module.exports = Player;