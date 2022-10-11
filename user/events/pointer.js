mdlr('[html]tutorial-pointer-events', m => {

  m.html`<div on={pointermove}>pointer-position: {x.toFixed(2)}, {y.toFixed(2)} {e}</div>`;

  m.css`
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
    e = {};

    pointermove(e) {
      ({ x: this.x, y: this.y } = e);
      const { pressure, tangentialPressure } = e;
      this.e = JSON.stringify({ pressure });

      m.render(this);
    }
  }

})
