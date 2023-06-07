mdlr('[html]tutorial-buienradar', m => {

  m.html`
  {#if feed}
    <table>
    {#each s in feed.actual.stationmeasurements.sort((a, b) => a.regio.localeCompare(b.regio))}
      <tr>
        <td>{s.regio}</td>
        <td>{s.temperature??'-'}</td>
        <td>{s.winddirection??''}{s.windspeedBft??''}</td>
        <td><img alt="{s.weatherdescription}" src="{s.iconurl}" /></td>
        <td>{s.weatherdescription}</td>
      </tr>
    {/each}
    </table>
  {:else}
    <div>Loading...</div>
  {/if}`;

  m.css`
  :root {
    background-color: white;
    display: block;
    overflow-y: auto;
    height: 100%;
  }
  tr, img {
    line-height: 1em;
    height: 1em;
    aspect-ratio: 1/1;
    font-size: 0.9rem;
  }
  td {
    padding: 0 0.25rem;
  }
  td:nth-child(2), td:nth-child(3) {
    text-align: center;
  }`;

  return class {
    feed = null;

    async connected() {
      this.feed = await fetch(`https://data.buienradar.nl/2.0/feed/json`).then(r => r.json());

      m.redraw(this);
    }
  }

})