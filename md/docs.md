# download

Forces file download.

**Parameters**

-   `fileName` **String** 

Returns **void** 

# getBase64

Base64 value of the recorded data.

**Examples**

```javascript
microm.getBase64().then(function(base64) {
    console.log(base64);
  });
```

Returns **Promise** 

# getBlob

Blob value of the recorded data.

Returns **Blob** 

# getBuffer

ArrayBuffer of the recorded data (raw binary data buffer).

Returns **ArrayBuffer** 

# getMp3

Returns all mp3 info.
Right now we are converting the recorded data
everytime this function it's called.

Returns **Promise** 

# getUrl

Link to the mp3.
It can be used as a audio "src" value

**Examples**

```javascript
microm.getUrl();
  // Something like --> "blob:http%3A//localhost%3A8090/8b40fc63-8bb7-42e3-9622-9dcc59e5df8f"
```

Returns **String** 

# getWav

Blob enconded as Wav.

Returns **Blob** 

# off

Remove an event handler

**Parameters**

-   `eventName` **String** 

Returns **void** 

# on

Attach an event handler function for event name

**Parameters**

-   `eventName` **String** 
-   `handler` **Function** 

Returns **void** 

# pause

Pauses the player.

Returns **void** 

# play

Reproduce the player audio.

Returns **void** 

# startRecording

Request browser microphone access and waits for it resolution.
If the user grant access, Microm will start recording the audio.

Returns **Promise** 

# stop

Stops recording audio if Micron is recording, if not
just pauses the player and set's the currentTime to 0.

**Examples**

```javascript
microm.stop().then(function(mp3) {
   console.log(mp3.url, mp3.blob);
  });
```

Returns **Promise** Will be resolved with the mp3.
