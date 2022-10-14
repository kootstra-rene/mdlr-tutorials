mdlr('[html]mdlr-blog', m => {

  const { blog } = m.require('mdlr-post1');

  m.require('[html]blog-post');

  m.html`
  <div>header</div>
  <blog-post title={blog.title} tldr={blog.tldr} sections={blog.sections} />
  <div>footer</div>`

  m.css`
  blog-post-title {
    height: 20vh;
  }
  `;

  return class {
    blog = blog;

    connected(){
      document.body.style.overflowY = 'auto';
    }
  }

})