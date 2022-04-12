mdlr('[html]examples-hello', m => {

  m.html`<div>hello, world</div>`;

})

mdlr('[html]examples-hello-named', m => {

  m.html`<div>hello, {name}</div>`;

  return class {
    name = 'noname';
  }

})

mdlr('[html]examples-hello-styled', m => {

  m.css`
    :root {
      all: unset;
      display: block;
      background-color: #111;
      border: orange solid 1px;
      border-radius: 0.5em;
      padding: 0.5em;
      margin-bottom: 0.25em;
    }

    div {
      color: orange;
    }`

  m.html`<div>hello, world</div>`;

})