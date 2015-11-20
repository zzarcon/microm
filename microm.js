var adapter = require("./bower_components/webrtc-adapter/adapter.js");
var RecordRTC = require("./bower_components/recordrtc/RecordRTC.js");
var Promise = require('rsvp').Promise;
var Converter = require('./lib/converter');
var Player = require('./lib/player');

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
        })
      });
    });
  }

  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
  }

  pause(currentTime) {
    if (!this.isPlaying) return;

    this.isPlaying = false;
  }

  stop() {
    if (this.isRecording) {
      return this.stopRecording();
    }

    this.isPlaying && this.pause(0);
  }

  getMp3() {
    var blob = this.recordRTC.getBlob();
    // TODO: trow error if we don't have recordedData yet
    return this.converter.toMp3(blob);
  }

  getWav() {

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