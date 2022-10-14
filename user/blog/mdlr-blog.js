mdlr('[html]mdlr-blog', m => {

  const { blog } = m.require('mdlr-post1');

  m.require('[html]blog-post');

  m.html`
  <header>header</header>
  <blog-post title={blog.title} tldr={blog.tldr} sections={blog.sections} />
  <footer>footer</footer>`

  m.css`
  :root {
    display:flex;
    flex-direction: column;
    width: 60vw;
    height: 100%;
    transform: translate(20vw,0);
    align-items: center;
  }
  blog-post {
    width: 60vw;
    flex: 1;
    overflow: hidden;
  }
  header, footer {
    width: 100%;
    background-color: #ccc;
    flex: none;
    text-align: center;
    line-height: 3vh;
    height: 3vh;
  }`;

  return class {
    blog = blog;

    connected(){
      document.body.style.cssText = `
        height: 100vh;
        overflow-y: hidden;
        position: absolute;
      `;
    }
  }

})