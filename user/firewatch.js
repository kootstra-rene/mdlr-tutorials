// todo: explain why it is better to us element scroll event i.s.o. window scroll event. (local vs global scope)
mdlr('[html]tutorial-firewatch', m => {

  const FIRE_WATCH_GAME_IMAGE = 'https://www.firewatchgame.com/images/parallax/parallax';

  m.html`
  {#each layer in [0, 1, 2, 3, 4, 5, 6, 7]}
    <div style="top: {top(layer).toFixed(3)}px" >
      <img alt="layer-#{layer}" src="${FIRE_WATCH_GAME_IMAGE}{layer}.png" />
      {#if layer === 7}
        <span style="opacity:{opacity.toFixed(1)}">scroll down</span>
      {/if}
    </div>
  {/each}

  <main{} on={scroll}>
    <img alt="layer-8" src="${FIRE_WATCH_GAME_IMAGE}8.png" />
    <div>You have scrolled {(main?.scrollTop || 0).toFixed(1)} pixels.</div>
  </main>`;

  m.css`
  :root {
    all: initial;
    display: block;
    background-color: rgb(32,0,1);
    height: 100%;
  }

  main {
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
  }

  > div {
    position: fixed;
    width: 100%;
    overflow:hidden;
    text-align: center;
  }

  img {
    position: relative;
    height: 712px;
    width: 2400px;
    left: 50%;
    top: 0px;
    transform: translate(-50%,0);
  }

  > div > span {
    display: block;
    position: absolute;
    top: 4em;
    font-size: 1em;
    text-transform: uppercase;
    width:100%;
    color: rgb(220,113,43);
  }

  main > img {
    top: 0.25rem;
  }
  main > div {
    position: relative;
    text-align: center;
    height: calc(100vh - 1rem);
    width: 100%;
    background-color: rgb(32,0,1);
    color: white;
  }`;

  return class {
    main;
    opacity = 1.0;

    top(layer) {
      const y = this.main?.scrollTop || 0;
      return -y * (layer / 8);
    }

    scroll(e) {
      this.opacity = Math.max(1.0 - Math.max(0, e.target.scrollTop / 60), 0);
      m.render(this);
    }
  }

})