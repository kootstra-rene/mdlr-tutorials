mdlr('[web]tutorial:mouse-events', m => {

  m.html`<div on{mousemove}>mouse-position: {x}, {y}</div>`;

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

    mousemove(e) {
      ({x: this.x, y: this.y} = e);
    }
  }

})
