(function() {
  window.onload = ready;
  window.microm = null;

  function ready() {
    window.microm = new Microm();

    microm.on('timeupdate', updateCurrentTime);
    microm.on('loadedmetadata', onLoaded);
    microm.on('play', onPlayEvent);
    microm.on('pause', onPauseEvent);
    microm.on('ended', onEndEvent);

    document.querySelector('#record').addEventListener('click', onRecord);
    document.querySelector('#play').addEventListener('click', onPlay);
    document.querySelector('#pause').addEventListener('click', onPause);
    document.querySelector('#stop').addEventListener('click', onStop);
    document.querySelector('#get-mp3').addEventListener('click', onGetMp3);
    document.querySelector('#get-wav').addEventListener('click', onGetWav);
    document.querySelector('#get-base64').addEventListener('click', onGetBase64);
    document.querySelector('#download').addEventListener('click', onDownload);
  }

  function onLoaded(duration) {
    console.log('onLoaded', duration);
  }
  
  function updateCurrentTime(currentTime) {
    console.log('currentTime', currentTime);
  }
  
  function onPlayEvent() {
    console.log('onPauseEvent');
  }
  
  function onPauseEvent(currentTime) {
    console.log('onPauseEvent', currentTime);
  }
  
  function onEndEvent() {
    console.log('onEndEvent');
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
  
  function onGetBase64() {
    microm.getBase64().then(function(base64string) {
      console.log(base64string);
    });
  }
  
  function onDownload() {
    microm.download('microm');
  }
})();