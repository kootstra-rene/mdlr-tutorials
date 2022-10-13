mdlr('[html]tutorial-clocks', m => {

  m.require('[html]tutorial-svg-clock');

  m.html`
  {#each location in locations}
    <div>
      <tutorial-svg-clock offset={location.offset} logo={location.name}/>
    </div>
  {/each}
  `;
  m.css`
  :root {
    height: 100vh;
    display: grid;
  }
  div {
    position: relative;
  }
  `;

  return class {
    locations = [
      {
        name: 'UTC',
        offset: 0
      },
      {
        name: 'UTC-06:00',
        offset: -6 * 60
      }]
  }

})