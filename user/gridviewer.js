mdlr('[html]tutorial-grid-viewer', m => {

  m.html`
    <table>
      {#each row, r in rows}
      <tr>
        {#each col, c in cols}
          <td>{getCell(r,c)}</td>
        {/each}
      </tr>
      {/each}
    </table>
    <div on={mousemove:scrolly}></div><div on={mousemove:scrollx}></div><div></div>`;

  m.css`
    :root {
      display: inline-grid;
      grid-template-columns: auto 1vh;
      grid-template-rows: auto 1vh;
      grid-template-areas: 
        "body scrolly"
        "scrollx scroll"
    }

    table {
      grid-area: body;
      background-color: #888;
    }

    div:nth-child(2) {
      background-color: #111;
      grid-area: scrolly;
    }
    div:nth-child(3) {
      height: 0.75em;
      background-color: #111;
      grid-area: scrollx;
    }
    div:nth-child(4) {
      height: 0.75em;
      background-color: #444;
      grid-area: scroll;
    }

    td {
      border: 1px solid black;
      width: 5em;
      height: 1.5em;
      text-align: center;
    }`;

  return class {
    cols = Array.from({ length: 10 }).fill('x');
    rows = Array.from({ length: 20 }).fill('y');
    rowOffset = 10;
    colOffset = 10;

    getCell(row, col) {
      return `${this.rowOffset + row}, ${this.colOffset + col}`;
    }

    scrollx(e) {
      const index = Math.round(e.x / (e.target.clientWidth-1) * (100 - this.cols.length));
      this.colOffset = index;
    }

    scrolly(e) {
      const index = Math.round(e.y / (e.target.clientHeight-1) * (10000 - this.rows.length));
      this.rowOffset = index;
    }
  }

})