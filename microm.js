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
    this.recordRTC = null;
    this.player = null;
    this.mp3 = null;
    this.eventListeners = {};
    this.converter = new Converter();
  }

  /**
   * Request browser microphone access and waits for it resolution.
   * If the user grant access, Microm will start recording the audio.
   * 
   * @return {Promise} 
   */
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
          self.player = new Player(mp3.url, self);

          resolve(mp3);
        })
      });
    });
  }

  /**
   * Reproduce the player audio.
   * 
   * @return {void}
   */
  play() {
    this.player.play();
  }

  /**
   * Pauses the player.
   * 
   * @return {void}
   */
  pause() {
    this.player.pause();
  }

  /**
   * Stops recording audio if Micron is recording, if not
   * just pauses the player and set's the currentTime to 0.
   *
   * @example
   *   microm.stop().then(function(mp3) {
   *    console.log(mp3.url, mp3.blob);
   *   });
   *   
   * @return {Promise} Will be resolved with the mp3.
   */
  stop() {
    if (this.isRecording) {
      return this.stopRecording();
    }

    this.player.stop();
  }

  /**
   * Returns all mp3 info.
   * Right now we are converting the recorded data
   * everytime this function it's called.
   * 
   * @return {Promise} 
   */
  getMp3() {
    var blob = this.recordRTC.getBlob();
    // TODO: trow error if we don't have recordedData yet
    return this.converter.toMp3(blob);
  }

  /**
   * Blob enconded as Wav.
   * 
   * @return {Blob} 
   */
  getWav() {

  }

  /**
   * Link to the mp3.
   * It can be used as a audio "src" value
   *
   * @example
   *   microm.getUrl();
   *   // Something like --> "blob:http%3A//localhost%3A8090/8b40fc63-8bb7-42e3-9622-9dcc59e5df8f"
   *   
   * @return {String} 
   */
  getUrl() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.url;
  }

  /**
   * Blob value of the recorded data.
   * 
   * @return {Blob} 
   */
  getBlob() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.blob;
  }

  /**
   * ArrayBuffer of the recorded data (raw binary data buffer).
   * 
   * @return {ArrayBuffer} 
   */
  getBuffer() {
    // TODO: trow error if mp3 is not ready
    return this.mp3.buffer;
  }

  /**
   * Base64 value of the recorded data.
   *
   * @example
   *   microm.getBase64().then(function(base64) {
   *     console.log(base64);
   *   });
   *   
   * @return {Promise}
   */
  getBase64() {
    // TODO: trow error if mp3 is not ready
    return this.converter.toBase64(this.getBlob());
  }

  /**
   * Forces file download.
   * 
   * @param  {String} fileName 
   * 
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

  /**
   * Attach an event handler function for event name
   * @param  {String} eventName 
   * @param  {Function} handler   
   * @return {void} 
   */
  on(eventName, handler) {
    // TODO: trow error if type of handler is not a function
    this.eventListeners[eventName] = handler;
  }

  /**
   * Remove an event handler
   * @param  {String} eventName 
   * @return {void}           
   */
  off(eventName) {
    //TODO: Warn if there's not eventName attached
    delete this.eventListeners[eventName];
  }
}

module.exports = Microm;