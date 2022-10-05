mdlr('[html]tutorial-scatterplot', m => {

  const data = m.require('tutorial-scatterplot:data');
  m.require('[html]tutorial-scatterplot-graph');

  m.html`
    <div class="chart">
      <h2>Anscombe's quartet</h2>
      {#each set in dataset}
        <tutorial-scatterplot-graph points={set.data} />
      {/each}
    </div>`;

  m.css`
    :root {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);      
    }

    .chart {
      background-color: #ccc;
      width: 100%;
      max-width: 640px;
      padding: 1em;
    }`;

  return class {
    dataset = ['a', 'b', 'c', 'd'].map(id => ({ data: data[id] }));
  }

})