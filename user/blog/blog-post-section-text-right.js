mdlr('[html]blog-post-section-text-right', m => {

  const { md } = m.require('markdown');

  m.html`
  {#if caption}{@html markdownCaption()}{/if}
  <img src="{url}"/><div>{@html markdownText()}</div>`;

  m.css`
  :root {
    display: inline-block;
    text-align: justify;
    font-size: 1.2em;
    line-height: 1.2em;
  }
  img {
    float: left;
    width : auto;
    height: 7.2em;
    padding: 0 0.6em 0.5em 0;
  }`;

  return class {
    url = null;
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