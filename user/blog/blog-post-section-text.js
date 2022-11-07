mdlr('[html]blog-post-section-text', m => {

  const { md } = m.require('markdown');

  m.html`{@html md([post?.body ?? '...'])}`;

  m.css`
  :root {
    display: inline-block;
    text-align: justify;
    font-size: 1.2em;
    line-height: 1.2em;
    width: 100%;
    padding: 1em 3em;
  }

  li {
    list-style-position: outside;
  }

  s {
    text-decoration: underline;
    text-underline-offset: -.25em;
    text-decoration-skip-ink: none;
  }

  sup, sub {
    line-height: 0;
    font-size: 70%;
  }

  iframe, img {
    border: 0;
    position: relative;
    height: 7.2em;
    width: auto;
  }

  iframe {
    aspect-ratio: 1 / 1;
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
  }
  
  pre {
    font-family: monospace;
    border-left: 0.25em solid #aaa;
    padding-left: 0.75em;
    font-size: 0.9em;
    line-height: 1.4em;
  }
  
  code {
    display:inline;
    font-family: monospace;
    background: #888;
    border-radius: 0.7em;
    padding: 0 0.5em 0.1em 0.5em;
    font-size: 0.9em;
    line-height: 1.4em;
    display: inline;
    top: -0.1em;
    position: relative;
    color: #fff;
  }`;

  return class {
    md = md;
    post = null;
  }

})