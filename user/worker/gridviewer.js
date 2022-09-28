mdlr('[html]grid-viewer', m => {

  const hugeDataSet = [];

  for (let row = 0 ; row < 100; row++){
    const dataRow = [];
    for (let col = 0; col < 100; col++){
      dataRow.push(`${row}, ${col}`);
    }
    hugeDataSet.push(dataRow);
  }

  m.html`
  <table>
    {#each row, r in rows}
    <tr>
      {#each col, c in cols}
        <td>{getCell(r,c)} - {row}, {col}</td>
      {/each}
    </tr>
    {/each}
  </table>`;

  m.css`
    table {
      background-color: #888;
    }

    td {
      border: 1px solid black;
      width: 5em;
      height: 1.5em;
      text-align: center;
    }`;

  return class {
    cols = Array.from({length: 10}).fill('x');
    rows = Array.from({length: 20}).fill('y');
    data = hugeDataSet;
    rowOffset = 10;
    colOffset = 10;

    getCell(row, col) {
      return this.data[this.rowOffset + row][this.colOffset + col];
    }
  }  

})