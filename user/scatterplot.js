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
    .chart {
      background-color: #ccc;
      width: 100%;
      max-width: 640px;
      height: calc(100% - 4em);
      min-height: 280px;
      max-height: 480px;
      margin: 0 auto;
    }`;

  return class {
    dataset = ['a', 'b', 'c', 'd'].map(id => ({ id, data: data[id] }));
  }

})

mdlr('[html]scatterplot-graph', m => {

  m.html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
    {#each point in points}
		  <circle cx={scaleX(point.x)} cy={scaleY(point.y)} r="0.5"/>
	  {/each}
    </svg>`;

  m.css`
    :root {
      display: inline-block;
      height: 50%;
      width: 50%;
    }

    svg {
      width: 100%;
      height: 100%;
    }
    
    circle {
      fill: orange;
      fill-opacity: 0.6;
      stroke: rgba(0, 0, 0, 0.5);
      stroke-width: 0.05;
    }`;

  return class {
    width = 20;
    height = 12;
    points = [];

    scaleX(x) {
      return x;
    }

    scaleY(y) {
      return this.height - y;
    }
  };

})

mdlr('scatterplot:data', m => {

  return {
    a: [
      { x: 10, y: 8.04 },
      { x: 8, y: 6.95 },
      { x: 13, y: 7.58 },
      { x: 9, y: 8.81 },
      { x: 11, y: 8.33 },
      { x: 14, y: 9.96 },
      { x: 6, y: 7.24 },
      { x: 4, y: 4.26 },
      { x: 12, y: 10.84 },
      { x: 7, y: 4.82 },
      { x: 5, y: 5.68 }
    ],
    b: [
      { x: 10, y: 9.14 },
      { x: 8, y: 8.14 },
      { x: 13, y: 8.74 },
      { x: 9, y: 8.77 },
      { x: 11, y: 9.26 },
      { x: 14, y: 8.1 },
      { x: 6, y: 6.13 },
      { x: 4, y: 3.1 },
      { x: 12, y: 9.13 },
      { x: 7, y: 7.26 },
      { x: 5, y: 4.74 }
    ],
    c: [
      { x: 10, y: 7.46 },
      { x: 8, y: 6.77 },
      { x: 13, y: 12.74 },
      { x: 9, y: 7.11 },
      { x: 11, y: 7.81 },
      { x: 14, y: 8.84 },
      { x: 6, y: 6.08 },
      { x: 4, y: 5.39 },
      { x: 12, y: 8.15 },
      { x: 7, y: 6.42 },
      { x: 5, y: 5.73 }
    ],
    d: [
      { x: 8, y: 6.58 },
      { x: 8, y: 5.76 },
      { x: 8, y: 7.71 },
      { x: 8, y: 8.84 },
      { x: 8, y: 8.47 },
      { x: 8, y: 7.04 },
      { x: 8, y: 5.25 },
      { x: 19, y: 12.5 },
      { x: 8, y: 5.56 },
      { x: 8, y: 7.91 },
      { x: 8, y: 6.89 }
    ]
  };

})