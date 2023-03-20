mdlr('[html]tutorial-firewatch', m => {

  m.html`
  <a href="https://www.firewatchgame.com">
    {#each layer in layers}
      <img style="transform: translate(0, {-y * layer / (layers.length - 1)}px)" src="https://www.firewatchgame.com/images/parallax/parallax{layer}.png" />
    {/each}
  </a>
  <div>
    <span style="opacity:{opacity}">scroll down</span>
    <div>You have scrolled {y.toFixed(1)} pixels</div>
  </div>`;

  m.css`
  :root {
    all: unset;
    display: block;
    background-color: rgb(32,0,1);
  }

  a {
    position: fixed;
    width: 2400px;
    height: 712px;
    left: 50%;
    transform: translate(-50%,0);
  }

  img {
    position: fixed;
    width: 100%;
    will-change: transform;
  }

  img:last-child::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(45,10,13);
  }

  div {
    position: relative;
    width: 100%;
    height: 300vh;
    color: rgb(220,113,43);
    text-align: center;
    padding: 4em 0.5em 0.5em 0.5em;
    box-sizing: border-box;
    pointer-events: none;
  }

  span {
    display: block;
    font-size: 1em;
    text-transform: uppercase;
    will-change: transform, opacity;
  }

  div > div {
    position: absolute;
    top: 711px;
    left: 0;
    width: 100%;
    height: calc(100% - 712px);
    background-color: rgb(32,0,1);
    color: white;
    padding: 50vh 0 0 0;
  }`;

  return class {
    layers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    opacity = 1.0;
    y = 0;

    connected() {
      document.body.style.overflow = "auto";
      document.addEventListener('scroll', e => {
        this.y = window.scrollY;
        this.opacity = 1.0 - Math.max(0, this.y / 40);
        m.render(this);
      });
    }
  }

})