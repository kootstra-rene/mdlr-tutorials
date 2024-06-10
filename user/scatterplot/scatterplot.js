mdlr('[web]tutorial:scatterplot-app', m => {

  const data = m.require('tutorial:scatterplot-data');
  m.require('[web]tutorial:scatterplot-graph');

  m.html`
    <h1>Anscombe's quartet</h1>
    {#each set in dataset}
      <scatterplot-graph points={set.data} />
    {/each}`;

  m.style`
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 2rem;
    background-color: #ccc;

    > h1 {
      height: 5%;
      line-height: 5%;
    }
    > scatterplot-graph {
      height: 47.5%;
    }`;

  return class {
    dataset = ['a', 'b', 'c', 'd'].map(id => ({ data: data[id] }));
  }

})