mdlr('[html]blog-post-section-text', m => {

  const { md } = m.require('markdown');

  m.html`
  {#if caption}{@html markdownCaption()}{/if}
  {@html markdownText()}`;

  m.css`
  :root {
    display: inline-block;
    text-align: justify;
    font-size: 1.2em;
    line-height: 1.2em;
    width: 100%;
  }
  iframe, img {
    border: 0;
    aspect-ratio: 1 / 1;
    position: relative;
    height: 7.2em;
    width: auto;
  }
  
  .float-left {
    float: left;
    padding: 0 0.6em 0.5em 0;
  }
  
  .float-right {
    float: right;
    padding: 0 0 0.5em 0.6em;
  }
  
  .center {
    display: block;
    padding: 0.5em;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
  }`;

  return class {
    text = null;
    caption = null;

    markdownCaption() {
      return md`${this.caption}`;
    }
    markdownText() {
      return md`${this.text}`;
    }
  } 

})