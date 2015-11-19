var Lame = require("../bower_components/lamejs/lame.all.js");
var Promise = require('rsvp').Promise;

var defaultEncodeOptions = {
  channels: 1,
  sampleRate: 44100,
  kbps: 128,
  maxSamples: 1152
};
const channels = {
  mono: 1,
  stereo: 2
};

class Converter {
  constructor() {
    
  }

  toMp3(blob) {
    var fileReader = new FileReader()
    fileReader.readAsArrayBuffer(blob)
    encodeSamples = @encodeSamples.bind(@)

    return new Promise((resolve, reject) => {
      fileReader.onload = this.onBlobReady;
    });
  }

  onBlobReady() {
    var blobResult = this.result;
    var samples = new Int16Array(blobResult);
    var wav = Lame.WavHeader.readHeader(new DataView(blobResult));

    if (wav.channels === channels.stereo) {
      var left = [], right = [], i = 0;

      while (i < samples.length) {
        left.push(samples[i]);
        right.push(samples[i + 1]);

        i += channels.stereo;
      }
        
      samples = [left, right];
    } else {
      samples = [samples];
    }
    
    this.encodeSamplesToMp3(samples, {
      channels: wav.channels,
      sampleRate: wav.sampleRate
    });      
  }

  encodeSamplesToMp3(samples, opts) {
    // TODO: extend defaultEncodeOptions --> use same Runtastic extend module
    opts = opts;
    var left = samples[0]
    var right = samples[1]
    var maxSamples = opts.maxSamples;
    var remaining = left.length;
    var mp3enc = new Lame.Mp3Encoder(opts.channels, opts.sampleRate, opts.kbps);
    var buffer = [], i = 0, mp3buf, ld, rd, data, blob, url;

    while (remaining >= maxSamples) {
      i += maxSamples;
      ld = left.splice(i, i + maxSamples);
      rd = right ? right.splice(i, i + maxSamples) : null;
      mp3buf = mp3enc.encodeBuffer(ld, rd);

      mp3buf.length > 0 && buffer.push(new Int8Array(mp3buf));

      remaining -= maxSamples;
    } 
      
    data = mp3enc.flush();

    data.length > 0 && buffer.push(new Int8Array(data));
    
    // TODO: add feature arrayBufferToBase64 https://github.com/zzarcon/ember-meme-generator/blob/master/app/controllers/application.js#L34-L43
    blob = new Blob(buffer, {type: 'audio/mp3'});
    url = URL.createObjectURL(blob);
    
    // TODO: add events
    // this.addEvents()
  }
}

module.exports = Converter;
