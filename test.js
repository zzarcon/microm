(function() {
  window.onload = ready;

  function ready() {
    var microm = new Microm();

    document.querySelector('#record').addEventListener('click', onRecord);
    document.querySelector('#play').addEventListener('click', onPlay);
    document.querySelector('#pause').addEventListener('click', onPause);
    document.querySelector('#stop').addEventListener('click', onStop);
    document.querySelector('#get-mp3').addEventListener('click', onGetMp3);
    document.querySelector('#get-wav').addEventListener('click', onGetWav);
  }

  function onRecord() {
    microm.startRecording().then(function() {
      console.log('recording...')
    }).catch(function() {
      console.log('error recording');
    })
  }
  function onPlay() {
    console.log('onPlay');
    microm.play();
  }
  function onPause() {
    console.log('onPause');
    microm.pause();
  }
  function onStop() {
    console.log('onStop');
    microm.stop();
  }
  function onGetMp3() {
    console.log('onGetMp3');
    microm.getMp3();
  }
  function onGetWav() {
    console.log('onGetWav');
    microm.getWav();
  }

})();