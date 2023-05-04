mdlr('[html]tutorial-numeric-input', m => {

  m.html`
  <label>
    <input type=number value={a} on={input:changeA} min=0 max=10 />
    <input type=range value={a} on={input:changeA} min=0 max=10 />
  </label>
  <br/>
  <label>
    <input type=number value={b} on={input:changeB} min=0 max=10 />
    <input type=range value={b} on={input:changeB} min=0 max=10 />
  </label>

  <p>{a} + {b} = {a + b}</p>`;

  m.css`
  :root {
    display: inline-block;
    background-color: #111;
    color: #ccc;
    padding: 0.5em;
  }

  p {
    margin: 0.5em 0 0 0;
  }`;

  return class {
    a = 0;
    b = 0;

    changeA(e) {
      this.a = +e.target.value;
      m.render(this);
    }

    changeB(e) {
      this.b = +e.target.value;
      m.render(this);
    }
  }

})