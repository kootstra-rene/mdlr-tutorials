mdlr('[web]tutorial:pointer-events', m => {

  m.html`<div on{pointermove}>pointer-position: {x.toFixed(2)}, {y.toFixed(2)} {text}</div>`;

  m.style`
  div {
    width: 100vw;
    height: 100vh;
    color: white;
    background-color: #333;
    line-height: 100vh;
    text-align: center;
    user-select: none;
  }`;

  return class {
    x = 0;
    y = 0;
    text = {};

    pointermove(event) {
      ({ x: this.x, y: this.y } = event);
      const { pressure } = event;
      this.text = JSON.stringify({ pressure });
    }
  }

})
