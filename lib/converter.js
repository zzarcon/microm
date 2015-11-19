var lame = require("../bower_components/lamejs/lame.all.js");
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

    fileReader.onload = this.onBlobReady;
  }

  onBlobReady() {
    var blobResult = this.result;
    var samples = new Int16Array(blobResult);
    var wav = lame.WavHeader.readHeader(new DataView(blobResult));

    if (wav.channels === channels.stereo) {
      var left = [], right = [], i = 0;

      while (i < samples.length) {
        left.push(samples[i]);
        right.push(samples[i + 1]);

        i += 2;
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
  }
}

module.exports = Converter;
