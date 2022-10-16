mdlr('[html]blog-post-sections', m => {

  m.require('[html]blog-post-tldr');
  m.require('[html]blog-post-section-text');

  m.html`
  <blog-post-tldr{=} />
  {#each section in sections}
    <blog-post-section-text{=section} />
  {/each}`

  m.css`
  * {
    box-sizing: border-box;
    user-select: none;
    font-family: sans-serif;
  }
  :root {
    height: 100%;
    overflow-y: auto;
    display: block;
  }`;

  return class {
    tldr = null;
    sections = null;
  } 

})