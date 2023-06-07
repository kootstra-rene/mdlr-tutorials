mdlr('[html]css-paper-pirouette', m => {

  // based on: https://codepen.io/team/keyframers/pen/YzKjoev

  m.require('foreach')
  
  m.html`
  <div id="app">
    <div class="papers">
    {#each i in papers}
      <div class="paper {!i ? '-rogue' : ''}" style="--i: {i}">
        <div class="segment">
          <div class="segment">
            <div class="segment">
              <span>-{text[i]}-</span>
              <div class="segment">
                <div class="segment"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
    </div>

    <div class="shadow">
    {#each i in papers}
      <div style="--i: {i}"/>
    {/each}
    </div>
  </div>`;

  m.style`
  --duration: 3.2s;
  --stagger: .65s;
  --easing: cubic-bezier(.36,.07,.25,1);
  --offscreen: 130vmax;
  --color-bg: #EF735A;
  --color-blue: #384969;
  --color-shadow: #211842;

  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg);
  height: 100%;
  font-family: sans-serif;
  user-select: none;
  overflow: hiddem;

  & *, & *:before, & *:after {
    box-sizing: border-box;
    position: relative;
  }

  & * {
    transform-style: preserve-3d;
  }

  & #app {
    height: 65vmin;
    width: 40vmin;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(25vw) rotateX(-20deg) rotateY(-55deg);
    background: var(--color-blue);
    border-radius: 2vmin;
    perspective: 10000px;

    &:before {
      border: 10vmin solid white;
      border-left-width: 2vmin;
      border-right-width: 2vmin;
      border-radius: inherit;
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      border: 10vmin solid white;
      border-left-width: 2vmin;
      border-right-width: 2vmin;
      background: var(--color-blue);
    }

    > .papers, &:before {
      transform: translateZ(3vmin);
    }

    &:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: inherit;
      border-radius: inherit;
      transform: translateZ(1.5vmin);
    }

    > .shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: bottom center;
      transform: rotateX(90deg);
      background: var(--color-shadow);
      border-radius: inherit;

      > div {
        background: var(--color-shadow);
        height: 50%;
        width: 100%;
        position: absolute;
        top: calc(100% + 3vmin);
        left: 0;
        transform-origin: top center;
        animation: shadow-in var(--duration) var(--easing) infinite;
        animation-delay: calc(var(--i) * var(--stagger));
        animation-fill-mode: both;
      }
    }
  }

  & .papers {
    width: 30vmin;
    height: 40vmin;
    background: white;
  }

  & .paper {
    --segments: 5;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    animation: fly-in var(--duration) var(--easing) infinite;
    animation-delay: calc((var(--i) * var(--stagger)));

    > div {
      height: calc(100% / var(--segments));
    }
  }

  & .segment {
    --rotate: 20deg;
    height: 100%;
    transform-origin: top center;
    background: white;
    border: 1px solid #0002;
    border-top: none;
    border-bottom: none;

    > .segment {
      top: 98%;
    }

    animation: inherit;
    animation-name: curve-paper;
  }

  & span {
    position:absolute;
    top: 0;
    left:0;
    width:100%;
    height:100%;
    text-align: center;
    font-size: 5vh;
    font-weight: bold;
  }

  & .paper.-rogue {
    transform-origin: top center -5vmin;
    
    & div {
      --rotate: 30deg;
      animation-name: curve-rogue-paper;
    }

    > div {
      animation: inherit;
      animation-name: rogue-paper;
      transform-origin: left top 20vmin;
    }
  }`;

  m.rules`
  @keyframes fly-in {
    0%, 2% { transform: translate3d(0, 80%, var(--offscreen)) rotateX(30deg) }
    80%, 100% { transform: translate3d(0) rotateX(0) }
  }

  @keyframes shadow-in {
    0%,5% { transform: scale(.8, 1) translateY(var(--offscreen)) }
    100% { transform: scale(.8,0) }
  }

  @keyframes curve-paper {
    0%, 2% { transform: rotateX(var(--rotate)) }
    90%, 100% { transform: rotateX(0) }
  }

  @keyframes curve-rogue-paper {
    0%, 50% { transform: rotateX(var(--rotate)) }
    100% { transform: rotateX(0) }
  }

  @keyframes rogue-paper {
    0%, 2% { transform: rotateX(2turn) }
    80%, 100% { transform: rotateX(0) }
  }`;

  return class {
    papers = [0, 1, 2, 3, 4];
    text = "whoot.mdlr.is.an.awesome.developer.experience...";

    connected(e) {
      let offset = this.papers.length;
      e.addEventListener('animationiteration', e => {
        if (e.animationName !== 'fly-in') return;

        const elem = e.target.querySelector('span');
        elem.textContent = this.text[offset++ % this.text.length];
      });
    }
  }
})