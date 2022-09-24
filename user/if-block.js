mdlr('[html]if-block', m => {

    m.html`
      {#if value > 10}
        <span>{value} is greater than 10</span>
      {:elseif value < 5}
        <span>{value} is less than 5</span>
      {:else}
        <span>{value} is between 5 and 10</span>
      {/if}`;
  
    m.css`
      :root {
        background-color: #111;
        white-space: pre;
        flex: 1;
        padding: 0.5em;
        color: white;
      }`;
  
    return class {
      value = 7;
    }
  
  })