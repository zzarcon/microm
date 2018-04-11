var Lame = require("../bower_components/lamejs/lame.all");
var Promise = require('rsvp').Promise;
var extend = require('extend');

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
    this.lame = new Lame();
  }

  toBase64(blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }

  toMp3(blob) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);

    return new Promise((resolve, reject) => {
      this.mp3Resolver = resolve;
      reader.onload = this.onBlobReady.bind(reader, this);
    });
  }

  onBlobReady(converter) {
    var blobResult = this.result;
    var samples = new Int16Array(blobResult);
    var wav = converter.lame.WavHeader.readHeader(new DataView(blobResult));

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
    
    converter.encodeSamplesToMp3(samples, {
      channels: wav.channels,
      sampleRate: wav.sampleRate,
      maxSamples: 57600
    });      
  }

  encodeSamplesToMp3(samples, opts) {
    opts = extend(defaultEncodeOptions, opts);

    var left = samples[0]
    var right = samples[1]
    var maxSamples = opts.maxSamples;
    var remaining = left.length;
    var mp3enc = new this.lame.Mp3Encoder(opts.channels, opts.sampleRate, opts.kbps);
    var buffer = [], i = 0, mp3buf, ld, rd, data, blob, url;

    while (remaining >= maxSamples) {
      i += maxSamples;
      ld = left.slice(i, i + maxSamples);
      rd = right ? right.slice(i, i + maxSamples) : null;
      mp3buf = mp3enc.encodeBuffer(ld, rd);

      mp3buf.length > 0 && buffer.push(new Int8Array(mp3buf));

      remaining -= maxSamples;
    } 
      
    data = mp3enc.flush();

    data.length > 0 && buffer.push(new Int8Array(data));
    
    blob = new Blob(buffer, {type: 'audio/mp3'});
    url = URL.createObjectURL(blob);
    
    this.mp3Resolver({
      buffer: buffer,
      blob: blob,
      url: url
    });
  }
}

module.exports = Converter;