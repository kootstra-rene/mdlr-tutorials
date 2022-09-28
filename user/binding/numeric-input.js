mdlr('[html]numeric-input', m => {

  m.html`
    <label>
      <input type=number value={a} on={change:changeA} min=0 max=10>
      <input type=range value={a} on={change:changeA} min=0 max=10>
    </label>
    <br>
    <label>
      <input type=number value={b} on={change:changeB} min=0 max=10>
      <input type=range value={b} on={change:changeB} min=0 max=10>
    </label>

    <p>{a} + {b} = {+a + +b}</p>`; // +a and +b are explicit conversions to number

  m.css`
    :root {
      display: inline-block;
      background-color: #111;
      color: #ccc;
      padding: 0.5em;
    }

    p {
      margin: 0;
      margin-top: 0.5em;
    }
    `;

  return class {
    a = 0;
    b = 0;

    changeA(e) {
      this.a = e.target.value;
    }

    changeB(e) {
      this.b = e.target.value;
    }
  }

})