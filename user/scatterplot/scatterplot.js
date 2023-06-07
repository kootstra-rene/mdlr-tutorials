mdlr('[html]tutorial-scatterplot', m => {

  const data = m.require('tutorial-scatterplot:data');
  m.require('[html]tutorial-scatterplot-graph');

  m.html`
    <h1>Anscombe's quartet</h1>
    {#each set in dataset}
      <tutorial-scatterplot-graph points={set.data} />
    {/each}`;

  m.css`
    :root {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      padding: 2rem;
      background-color: #ccc;
    }
    > h1 {
      height: 5%;
      line-height: 5%;
    }
    > tutorial-scatterplot-graph {
      height: 47.5%;
    }`;

  return class {
    dataset = ['a', 'b', 'c', 'd'].map(id => ({ data: data[id] }));
  }

})