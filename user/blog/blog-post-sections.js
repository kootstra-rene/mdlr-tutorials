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
  }
  :root {
    height: 100%;
    overflow-y: auto;
    display: block;
  }
  
  s {
    text-decoration: underline;
    text-underline-offset: -.25em;
    text-decoration-skip-ink: none;    
  }

  sup, sub {
    line-height: 0;
  }
  `;

  return class {
    tldr = null;
    sections = null;
  } 

})