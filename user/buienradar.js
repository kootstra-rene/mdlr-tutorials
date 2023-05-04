mdlr('[html]tutorial-buienradar', m => {

  m.html`
  {#if feed}
    <table>
    {#each station in feed.actual.stationmeasurements.sort((a, b) => a.regio.localeCompare(b.regio))}
      <tr>
        <td>{station.regio}</td>
        <td>{station.temperature ?? '-'}</td>
        <td>{station.winddirection??''}{station.windspeedBft??''}</td>
        <td><img alt="{station.weatherdescription}" src="{station.iconurl}" /></td>
        <td>{station.weatherdescription}</td>
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
  }
  tr, img {
    line-height: 1em;
    height: 1em;
    aspect-ratio: 1/1;
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