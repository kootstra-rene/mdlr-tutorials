mdlr('[web]css-transitions', m => {

  m.html`<div>CSS</div>`;

  m.style`
  height: 100%;
  width: 100%;

  > div {
    position: absolute;
    animation: animate 5s infinite;
    background-color: lightgreen;
    width: 3rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-weight: bold;
    border-radius: 0.5rem;
    top: calc(50% - 1rem);
    margin-left: 10%;
  }`;

  m.global`
  @keyframes animate {
      0% { transform: rotate(0deg); left: 0px; }
     25% { transform: rotate(45deg); left: 0px; }
     50% { transform: rotate(0deg); left: calc(80% - 3rem); }
     55% { transform: rotate(0deg); left: calc(80% - 3rem); }
     70% { transform: rotate(0deg); left: calc(80% - 3rem); background: #1ec7e6; }
    100% { transform: rotate(-360deg); left: 0px; }
  }`;

})