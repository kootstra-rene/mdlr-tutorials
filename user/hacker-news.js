mdlr('[html]hacker-news', m => {

    m.html`
      {#each item in newsItems}
        <a href="{item.url}">{item.title}</a><br>
      {/each}`;
  
    m.css`
      :root {
        display: block;
        background-color: #111;
        color: white;
        height: 100%;
        text-align: center;
        line-height: 2em;
      }
      
      a {
        color: white;
      }
  
      a:visited {
        color: gray;
      }`;
  
    return class {
      newsItems = [];
  
      async connected() {
        this.newsItems = await fetch(`https://api.hackerwebapp.com/news`).then(r => r.json());
  
        m.redraw(this);
      }
    }
  })