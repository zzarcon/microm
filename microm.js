var lame = require("./bower_components/lamejs/lame.all.js");
var adapter = require("./bower_components/webrtc-adapter/adapter.js");
var RecordRTC = require("./bower_components/recordrtc/RecordRTC.js");
var RSVP = require('rsvp');
var Promise = RSVP.Promise;

class Microm {
  constructor() {
    this.isRecording = false;
  }

  startRecording() {
    console.log('record');  
    this.isRecording = true;

    return new Promise((resolve, reject) => {

    });
  }

  stopRecording() {
    this.isRecording = false;
  }
}

module.exports = Microm;