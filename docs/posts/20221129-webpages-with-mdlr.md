---
title: "Building web-components with MDLR"
tldr: "How to ..."
author: "..."
tags: ["html", "css", "introduction"]
---

## HTML component

In MDLR a web-component can be declared as (atleast one dash is required in the name):
```
mdlr('[html]web-component', m => {
  ...
})
```

### Adding HMTL

```
m.html`<span>Hello world!</span>`;
```

### Putting it all together

```
mdlr('[html]web-component', m => {
  m.html`<span>Hello world!</span>`;
})
```
Which results in:  
![web-component](#/resources/web-component.html|style="border: 1px solid black; height:2em; width: 10em; padding: 0.5em")  
  
## HTML component with CSS

Continuing on the example...

### Adding CSS

```
m.css`span {
  display: block;
  text-align: center;
  font-weight: bold;
}`;
```

### Putting it all together

```
mdlr('[html]web-component-css', m => {
  m.html`<span>Hello world!</span>`;
  
  m.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`;
})
```
Which results in:  
![web-component](#/resources/web-component-css.html|style="border: 1px solid black; height:2em; width: 10em; padding: 0.5em")  
  
## HTML component with State

Continuing on the example...

### Adding state

```
return class {
  bang = '!!!';
};
```

### Putting it all together

```
mdlr('[html]web-component-state', m => {
  m.html`<span>Hello world{bang}</span>`;
  
  return class {
    bang = '!!!';
  };
})
```
Which results in:  
![web-component](#/resources/web-component-state.html|style="border: 1px solid black; height:2em; width: 10em; padding: 0.5em")
