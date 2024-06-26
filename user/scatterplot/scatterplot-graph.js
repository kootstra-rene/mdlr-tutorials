mdlr('[web]tutorial:scatterplot-graph', m => {

  const { linear } = m.require('scale');

  m.html`
  <svg viewBox="0 0 {width} {height}">
    <g class="axis y-axis">
      {#each tick in yTicks}
        <g class="tick" transform="translate(0, {yScale(tick)})">
          <line x1="{padding.left}" x2="{xScale(22)}"/>
          <text x="{padding.left - 8}" y="+4">{tick}</text>
        </g>
      {/each}
    </g>

    <g class="axis x-axis">
      {#each tick in xTicks}
        <g class="tick" transform="translate({xScale(tick)},0)">
          <line y1="{yScale(0)}" y2="{yScale(13)}"/>
          <text y="{height - padding.bottom + 16}">{tick}</text>
        </g>
      {/each}
    </g>

    {#each point in points}
      <circle cx={xScale(point.x)} cy={yScale(point.y)} r="5"/>
    {/each}
  </svg>`;

  m.style`
  display: inline-block;
  height: 50%;
  width: 50%;

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

  return class {
    width = 320;
    height = 240;
    points = [];
    xTicks = [0, 4, 8, 12, 16, 20];
    yTicks = [0, 4, 8, 12];
    padding = { top: 20, right: 40, bottom: 40, left: 25 };
    xScale = linear().domain(0, 20).range(this.padding.left, this.width - this.padding.right);
    yScale = linear().domain(0, 12).range(this.height - this.padding.bottom, this.padding.top);
  };

})