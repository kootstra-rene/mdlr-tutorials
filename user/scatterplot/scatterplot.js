mdlr('[html]scatterplot', m => {

  const data = m.require('scatterplot:data');
  m.require('[html]scatterplot-graph');

  m.html`
    <div class="chart">
      <h2>Anscombe's quartet</h2>
      {#each set in dataset}
        <m-scatterplot-graph points={set.data}></m-scatterplot-graph>
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