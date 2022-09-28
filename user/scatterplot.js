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
      margin: 0 auto;
      padding: 1em;
    }`;

  return class {
    dataset = ['a', 'b', 'c', 'd'].map(id => ({ data: data[id] }));
  }

})

mdlr('[html]scatterplot-graph', m => {

  m.html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
    <g class="axis y-axis">
		{#each tick in yTicks}
			<g class="tick tick-{tick}" transform="translate(0, {scaleY(tick)})">
				<line x1="{padding.left}" x2="{scaleX(22)}"/>
				<text x="{padding.left - 8}" y="+4">{tick}</text>
			</g>
		{/each}
	  </g>

    <g class="axis x-axis">
		{#each tick in xTicks}
			<g class="tick" transform="translate({scaleX(tick)},0)">
				<line y1="{scaleY(0)}" y2="{scaleY(13)}"/>
				<text y="{height - padding.bottom + 16}">{tick}</text>
			</g>
		{/each}
	  </g>

    {#each point in points}
		  <circle cx={scaleX(point.x)} cy={scaleY(point.y)} r="5"/>
	  {/each}
    </svg>`;

  m.css`
    :root {
      display: inline-block;
      height: 50%;
      width: 50%;
    }

    .tick line {
      stroke: #999;
      stroke-dasharray: 2;
    }

    .x-axis text {
      text-anchor: middle;
    }
  
    .y-axis text {
      text-anchor: end;
    }

    text {
      font-size: 12px;
      fill: #999;
    }

    svg {
      width: 100%;
      height: 100%;
    }
    
    circle {
      fill: orange;
      fill-opacity: 0.6;
      stroke: rgba(0, 0, 0, 0.5);
      stroke-width: 0.5;
    }`;

  function linear() {
    const instance = {
      dMin: 0,
      dMax: 0,
      rMin: 0,
      rMax: 0,
      domain: (min, max) => {
        instance.dMin = min;
        instance.dMax = max;
        return instance;
      },
      range: (min, max) => {
        instance.rMin = min;
        instance.rMax = max;
        return (v) => {
          const { dMin, dMax, rMin, rMax } = instance;
          return rMin + (((v - dMin) / (dMax - dMin)) * (rMax - rMin));
        };
      },
    };

    return instance;
  }

  return class {
    width = 320;
    height = 240;
    points = [];
    xTicks = [0, 4, 8, 12, 16, 20];
    yTicks = [0, 4, 8, 12];
    padding = { top: 20, right: 40, bottom: 40, left: 25 };
    xScale = linear().domain(0, 20).range(this.padding.left, this.width - this.padding.right);
    yScale = linear().domain(0, 12).range(this.height - this.padding.bottom, this.padding.top);

    scaleX(x) {
      return (this.xScale(x)).toFixed(1);
    }

    scaleY(y) {
      return (this.yScale(y)).toFixed(1);
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