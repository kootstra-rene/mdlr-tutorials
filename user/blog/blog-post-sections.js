mdlr('[html]blog-post-sections', m => {

  m.require('[html]blog-post-tldr');
  m.require('[html]blog-post-section-text');
  m.require('[html]blog-post-section-no-text');
  m.require('[html]blog-post-section-text-right');
  m.require('[html]blog-post-section-text-left');

  m.html`
  <blog-post-tldr{=} />
  {#each section in sections}
    {#if section.type === 'text'}
      <blog-post-section-text text={section.text} />
    {:elseif section.type === 'no-text'}
      <blog-post-section-no-text url={section.url} />
    {:elseif section.type === 'text-right'}
      <blog-post-section-text-right text={section.text} url={section.url} />
    {:elseif section.type === 'text-left'}
      <blog-post-section-text-left text={section.text} url={section.url} />
    {:else}
      <div>{section.text ?? ''}</div>
    {/if}
    <hr/>
  {/each}`

  m.css`
  * {
    box-sizing: border-box;
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