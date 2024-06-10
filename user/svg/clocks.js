mdlr('[web]tutorial:multiple-clocks', m => {

  m.require('[web]tutorial:svg-clock');

  //<div><svg-clock offset={} logo={name}/></div>
  //<div><svg-clock{={offset,logo:name}}/></div>

  m.html`
  {#each {offset, name} in locations}
    <div><svg-clock offset={} logo={name}/></div>
  {/each}
  `;

  m.style`
  height: 100vh;
  display: grid;

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
        name: 'UTC+03:00',
        offset: +3 * 60
      },
      {
        name: 'UTC-06:00',
        offset: -6 * 60
      }]
  }

})