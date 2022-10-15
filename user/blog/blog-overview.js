mdlr('[html]blog-overview', m => {

  m.require('[html]blog-post-title');
  m.require('[html]blog-overview-item');

  m.html`
  <blog-post-title{=} />
  {#each post in blog}
    <blog-overview-item{=post} />
  {:else}
    <span>...</span>
  {/each}
  `

  m.css`
  :root {
    display: flex;
    flex-direction: column;
  }

  blog-post-title {
    line-height: 8vh;
    height: 8vh;
    flex: none;
  }
  
  blog-overview-item {
    flex: 1;
    border: 1px solid #ccc;
  }
  
  blog-overview-item + blog-overview-item {
    border-top: 0;
  }`;

  return class {
    blog = null;
    title = 'MDLR development blog';
  }

})