mdlr('[html]svg-clock', m => {

    m.html`
    <svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px" viewBox="-50 -50 100 100">
      <circle xmlns="http://www.w3.org/2000/svg" class="dialplate" r="48"></circle>
      {#each minute in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}
        <line xmlns="http://www.w3.org/2000/svg" class="major" y1="35" y2="45" transform="rotate({30 * minute})"></line>
        {#each offset in [1, 2, 3, 4]}
          <line xmlns="http://www.w3.org/2000/svg" class="minor" y1="42" y2="45" transform="rotate({6 * (minute + offset)})"></line>
        {/each}
      {/each}
      <line xmlns="http://www.w3.org/2000/svg" class="hour" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})"></line>
      <line xmlns="http://www.w3.org/2000/svg" class="minute" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})"></line>
      <line xmlns="http://www.w3.org/2000/svg" class="second" y1="10" y2="-38" transform="rotate({6 * seconds})"></line>
    </svg>`;
  

    m.css`:root {
      position: absolute;
      left: 0;
      top: 0;
      right:0;
      bottom: 0;
    }
  
    .dialplate {
      stroke: #eee;
      fill: #111;
    }
    
    .major {
      stroke: #333;
      stroke-width: 1;
    }

    .minor {
      stroke: #999;
      stroke-width: 0.5;
    }

    .hour {
      stroke: #333;
    }

    .minute {
      stroke: #666;
    }

    .second {
      stroke: #b00;
    }

    svg {
      width: 100%;
      height: 100%;
    }`;
  
    return class {
      hours = 0;
      minutes = 0;
      seconds = 0;
  
      #updateTime() {
        let time = new Date();
        this.hours = time.getHours();
        this.minutes = time.getMinutes();
        this.seconds = time.getSeconds();

        m.render(this);
      }

      connected() {
        setInterval(this.#updateTime.bind(this), 250);
        this.#updateTime();
      }
    }
  
  })
  