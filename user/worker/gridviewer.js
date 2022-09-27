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
    {#each row in [0,1,2]}
    <tr>
      {#each col in [0,1,2]}
      <td>{data[rowOffset+row][colOffset+col]}</td>
      {/each}
    </tr>
    {/each}
  </table>
  `

  m.css`
    td {
      border: 1px solid black;
      width: 5em;
      height: 1.5em;
      text-align: center;
    }
  `

  return class {
    data = hugeDataSet;
    rowOffset = 10;
    colOffset = 10;
  }  

})