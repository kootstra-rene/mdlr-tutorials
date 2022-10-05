mdlr('[html]tutorial-navigator-usermedia', m => {

  m.html`<video control playsinline></video>`;

  m.css`
  :root {
    display: block;
    padding: 2em;
  }

  video { 
    transform: scale(-1, 1) !important;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  video::-webkit-media-controls-panel {
    transform: scale(-1,1);
  }`

  return class {

    connected() {

      const constraints = {
        video: { width: 1280, height: 960 }
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream) => {
          const video = document.querySelector('video');
          video.srcObject = mediaStream;
          video.onloadedmetadata = () => {
            video.play();
          };
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });

    }
  }

})