var adapter = require("./bower_components/webrtc-adapter/adapter.js");
var RecordRTC = require("./bower_components/recordrtc/RecordRTC.js");
var Promise = require('rsvp').Promise;
var Converter = require('./lib/converter');
var Player = require('./lib/player');
var config = require('./lib/config');

config.setup();

class Microm {
  constructor() {
    this.isRecording = false;
    this.isPlaying = false;
    this.recordRTC = null;
    this.player = null;
    this.mp3 = null;
    this.converter = new Converter();
  }

  startRecording() {
    this.isRecording = true;
    var media = navigator.mediaDevices.getUserMedia({audio: true})

    media.then(this.startUserMedia.bind(this)).catch(this.onUserMediaError.bind(this));    
    return media;
  }

  stopRecording() {
    var self = this;
    this.isRecording = false;

    return new Promise((resolve, reject) => {
      self.recordRTC.stopRecording(() => {
        self.getMp3().then((mp3) => {
          self.mp3 = mp3;
          self.player = new Player(mp3.url);

          resolve(mp3);
        })
      });
    });
  }

  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.player.play();
  }

  pause(currentTime) {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    this.player.pause();
  }

  stop() {
    if (this.isRecording) {
      return this.stopRecording();
    }

    this.isPlaying && this.pause(0);
  }

  /**
   * Returns all mp3 info.
   * Right now we are converting the recorded data
   * everytime this function it's called.
   * @return {Promise} 
   */
  getMp3() {
    var blob = this.recordRTC.getBlob();
    // TODO: trow error if we don't have recordedData yet
    return this.converter.toMp3(blob);
  }

  getWav() {

  }

  getUrl() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.url;
  }

  getBlob() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.blob;
  }

  getBuffer() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.buffer;
  }

  getBase64() {
    // TODO: trow error if mp3 is not ready
    return this.converter.toBase64(this.getBlob());
  }
  
  /**
   * Forces file download
   * @param  {String} fileName 
   * @return {void}
   */
  download(fileName = 'micro_record') {
    var link = document.createElement('a');
    var click = document.createEvent("Event");

    link.href = this.getUrl();
    link.download = `${fileName}.mp3`;

    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }

  startUserMedia(stream) {
    var recordRTC = RecordRTC(stream, {type: 'audio'})
    recordRTC.startRecording();
      
    this.recordRTC = recordRTC;
    this.isRecording = true;
  }

  onUserMediaError() {
    // TODO: Handle recording error
  }
}

module.exports = Microm;