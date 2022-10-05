// based-on [https://reactjsexample.com/simple-but-well-styled-calculator-made-by-using-hooks/]
mdlr('[html]tutorial-calculator', m => {

  m.html`
    <div class="output">
      <span>{input || 0}</span>
      <span>{result}</span>
    </div>
    <div class="keypad">
    {#each control in ['/','*','+','-','C']}
      <button class="control" on={click}>{control}</button>
    {/each}
    {#each digit in [1,2,3,4,5,6,7,8,9,'.',0,'=']}
      <button class="digit" on={click}>{digit}</button>
    {/each}
    </div>
  `;

  m.css`
    :root {
      display: block;
      /* box-shadow: 0px 0px 100px #cccccc;  */
      margin: 20px auto;
      width: 500px;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    
    div.output {
      height: 140px;
      box-shadow: inset 0px 0px 20px #888;
      text-align: right;
      font-size: 80px;
      opacity: 46.5%;
      background-color: #ccc;
      border: 1px solid black;
      flex-direction: column;
      padding: 0.1em;
    }

    span {
      display: block;
    }

    div.output > span:last-child {
      font-size: 40px;
    }
    
    div.output > span {
      opacity: 26.5%;
    }
    
    div.keypad {
      width: 100%;
    }

    button {
      font-size: 40px;
    }

    button.control {
      border: solid 1px #888;
      background-color: #999;
      box-shadow: inset 0px 0px 20px #aaa;
      width: calc(500px / 5);
      height: 100px;  
    }

    button.control:hover {
      background-color: #ccc;
    }

    button.digit {
      border: solid 1px #888;
      background-color: #bbb;
      box-shadow: inset 0px 0px 20px #ccc;
      width: calc(500px / 3);
      height: 100px;  
    }

    button.digit:hover {
      background-color: #ccc;
    }`;

  return class {
    input = '';
    result = '';

    click(e) {
      const key = e.target.textContent;

      switch (key) {
        case 'C':
          this.input = '';
          this.result = '';
          break;
        case '=':
          this.input = this.#evaluteInput();
          break;
        default:
          this.input += key;
          this.result = this.#evaluteInput();
          break;
      }
    }

    #evaluteInput() {
      try { 
        return `${eval(this.input || '0')}`;
      }
      catch (e) {
        return this.result;
      }
    }
  };

})