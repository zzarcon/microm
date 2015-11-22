var assert = chai.assert;
var expect = chai.expect;

describe('Microm', function() {
  var microm;
  var eventName = 'timeupdate';
  var onTimeupdate = function() {

  };
  beforeEach(function() {
    microm = new Microm();
  });
  describe('Core', function() {
    it('Should exist', function() {
      assert.equal(typeof microm !== "undefined", true);
    });
    it('Record', function() {
      expect(microm.record).to.be.a('function');
    });
    it('Stop', function() {
      expect(microm.stop).to.be.a('function');
    });
    it('Play', function() {
      expect(microm.play).to.be.a('function');
    });
    it('Pause', function() {
      expect(microm.pause).to.be.a('function');
    });
    it('Download', function() {
      expect(microm.download).to.be.a('function');
    });
    it('Get base64', function() {
      expect(microm.getBase64).to.be.a('function');
    });
    it('Get Blob', function() {
      expect(microm.getBlob).to.be.a('function');
    });
    it('Get ArrayBuffer', function() {
      expect(microm.getBuffer).to.be.a('function');
    });
    it('Get mp3', function() {
      expect(microm.getMp3).to.be.a('function');
    });
    it('Get url', function() {
      expect(microm.getUrl).to.be.a('function');
    });
  });

  describe('Events', function() {
    it('Can subscribe to an event', function() {
      expect(microm.eventListeners).to.be.a('object');
      expect(microm.eventListeners).to.be.empty;
      expect(microm.on).to.be.a('function');

      microm.on(eventName, onTimeupdate);

      expect(Object.keys(microm.eventListeners)).to.have.length(1);
      expect(microm.eventListeners[eventName]).to.be.a('function');
    });
    it('Can unsubscribe to an event', function() {
      expect(microm.off).to.be.a('function');
      expect(microm.eventListeners).to.be.empty;

      microm.on(eventName, onTimeupdate);

      expect(Object.keys(microm.eventListeners)).to.have.length(1);
      microm.off(eventName);

      expect(microm.eventListeners).to.be.empty;
    });
  });
});