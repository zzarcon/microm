var RSVP = require('rsvp');

module.exports = function() {
  function setup() {
    // Avoid Error swallowing
    RSVP.on('error', function(reason) {
      console.assert(false, reason);
    });
  }
  
  return {
    setup: setup
  };
}();