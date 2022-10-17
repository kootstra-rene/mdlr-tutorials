mdlr('[html]blog-overview', m => {

  m.require('[html]blog-post-title');
  m.require('[html]blog-overview-item');

  m.html`
  <blog-post-title{=} />
  {#each post in blog}
    <blog-overview-item{=post} />
    <hr />
  {:else}
    <span>...</span>
  {/each}
  `

  m.css`
  :root {
    display: block;
  }

  blog-post-title {
    line-height: 8vh;
    height: 8vh;
  }
  
  blog-overview-item {
    margin: 0.5em 0;
  }
  
  blog-overview-item + blog-overview-item {
    border-top: 0;
  }`;

  return class {
    blog = null;
    title = 'The official blog';
  }

})