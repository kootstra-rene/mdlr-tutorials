mdlr('[html]tutorial-svg-clock', m => {

  const utcOffset = (new Date()).getTimezoneOffset();

  m.html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100">
    <circle class="dialplate" r="48" />
    <text x="0" y="18" dominant-baseline="middle" text-anchor="middle" >{logo}</text>

    {#each m in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
      <line class="major" y1="35" y2="45" transform="rotate({6 * m})" />

      {#each o in [1, 2, 3, 4]}
        <line class="minor" y1="42" y2="45" transform="rotate({6 * (m + o)})" />
      {/each}
    {/each}

    <line class="hours" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" />
    <line class="minutes" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" />
    <line class="seconds" y1="10" y2="-38" transform="rotate({6 * seconds})" />
  </svg>`;

  m.css`
  :root {
    position: absolute;
    left: 0;
    top: 0;
    right:0;
    bottom: 0;
  }

  svg > * {
    stroke-linecap: round;
  }

  .dialplate {
    stroke: #eee;
    fill: #111;
  }
  
  .major {
    stroke: #666;
    stroke-width: 1;
  }

  .minor {
    stroke: #999;
    stroke-width: 0.5;
  }

  .hours {
    stroke: #555;
  }

  .minutes {
    stroke: #666;
  }

  .seconds {
    stroke: #b00;
  }

  text {
    font: bold 7px sans-serif;
    fill: #999;
  }

  svg {
    width: 100%;
    height: 100%;
  }`;

  return class {
    logo = 'mdlr';
    offset = 0; // in minutes
    hours = 0;
    minutes = 0;
    seconds = 0;

    connected() {
      setInterval(this.#updateTime.bind(this), 500);
      this.#updateTime();
    }

    #updateTime() {
      const tzOffset = (this.offset + utcOffset) * 60 * 1000;
      let time = new Date(Date.now() + tzOffset);
      this.hours = time.getHours();
      this.minutes = time.getMinutes();
      this.seconds = time.getSeconds();

      m.render(this);
    }
  }

})