mdlr('[html]tutorial-button', m => {

  m.html`<button on={click}>clicked {count} times</button>`;

  return class {
    count = 0;

    click() {
      ++this.count;
    }
  }
})

mdlr('[html]tutorial-button-styled', m => {

  m.html`<button on={click}>clicked {count} times</button>`;

  m.css`
    :where(*) {
      all: unset;
    }

    button {
      color: orange;
      border: orange solid 1px;
      border-radius: 0.5em;
      padding: 0.5em 1.0em;
      background-color: #111;
      user-select: none;
      cursor: pointer;
    }`;

  return class {
    count = 0;

    click() {
      ++this.count;
    }
  }
})