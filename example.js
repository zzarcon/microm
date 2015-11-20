(function() {
  window.onload = ready;
  window.microm = null;

  function ready() {
    window.microm = new Microm();

    document.querySelector('#record').addEventListener('click', onRecord);
    document.querySelector('#play').addEventListener('click', onPlay);
    document.querySelector('#pause').addEventListener('click', onPause);
    document.querySelector('#stop').addEventListener('click', onStop);
    document.querySelector('#get-mp3').addEventListener('click', onGetMp3);
    document.querySelector('#get-wav').addEventListener('click', onGetWav);
    document.querySelector('#download').addEventListener('click', onDownload);
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
    microm.stop().then(function(mp3) {
      console.log('onStop', mp3);
    });
  }
  function onGetMp3() {
    microm.getMp3().then(function(mp3) {
      console.log('onGetMp3', mp3);
    });
  }
  function onGetWav() {
    console.log('onGetWav');
    microm.getWav();
  }
  function onDownload() {
    microm.download('microm');
  }
})();