---
title: "MDLR - The Module System"
tldr: "Explanation of the MDLR module system"
author: "Rene Kootstra"
tags: ["introduction"]
---

A module in MDLR is created in the following manner: 
```
mdlr('[type]module', m => {
})
```

## Module Types
MDLR has different types of modules that you can define, namely:
- **[unit]**: module
- **[test]**: test module
- **[html]**: web-component module
  
The folowing sections describe each of these module types and explaines the usage as well as some design decisions. 

### *[unit]* module

The *[unit]* module type is used to create a 'normal' MDLR module. The '[unit]' prefix is optional, so the hello-world module will look like:  
```
mdlr('hello-world', m => {
  console.log('hello world!');
})
```
Modules should be able to import/export values from/to other modules. ES6 introduces the module system and defined the import/export keywords to solve this issue. MDLR doesn't use those keywords as JavaScript already has a method to export values, namely: `return`. To import a value from another module you can use: `m.require`. To explain we refactor the 'hello-world' module to:
```
mdlr('console', m => {
  return { console };
})
  
mdlr('hello-world', m => {
  const { console } = m.require('console');
  
  console.log('hello world!');
})
```
Not the most useful refactor one would say but it makes the import/export very clear and we have added the possibility to inject another console implementation but that will be addressed in another blog.  
  
The best practice for exporting values from a module is to return an object with the values that the module provides. 
The primary reason is the Open-Close principle from SOLID. It will make your module open for change as you can add more values to the returned object. It will also make your module closed for modification, that is if you never remove values nor change their interface nor semantic meaning.  
  
So now you know how to define *[unit]* modules...

### *[test]* module

The *[test]* module type is used to create a MDLR test module. The '[test]' prefix is required and enables the testing functionality:
```
mdlr('console', m => {
  return { console };
})
  
mdlr('[test]console', m => {
  const { it, expect } = m.test;  
  
  const { console } = m.require('console');  
  
  it('should use the global console', done => {  
    expect(console).to.eql(globalThis.console);  
    done();
  })  
})
```
As can be seen in the example when using *[test]*, the testing functionality is available at `m.test`. It is encouraged to obtain the required functionality via [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). The example destructures `it` and `expect` and both are required for writing a passing test. `it` defines a test-case and `expect` allows you to verify an expectation. If a test has no expectation it will not pass. When you are finished with the test then you need to call `done()` to signal the completion of the test. This methodology allows for asynchronous behaviour. `done` is a recurring concept in MDLR and more details can be found in this [blog](link:#/posts/20221202-getting-async-things-done.md).  
  
So now you know how to define *[test]* modules.. more information about testing can be found in this [blog](link:#/posts/20231203-mdlr-testing.md).

### *[html]* module

The *[html]* module type is used to create a MDLR web-component module. The '[html]' prefix is required and enables the web-component functionality:
```

mdlr('[html]hello-world', m => {
  
  m.html`<span>Hello world{bang}</span>;
  
  m.css`span {
    display: block;
    text-align: center;
    font-weight: bold;
  }`;
  
  return class {
    bang = '!!!';
  }
})
```
Which results in:  
![web-component](#/resources/web-component-css-state.html|style="border: 1px solid black; height:2em; width: 10em; padding: 0.5em")  
  
As can be seen in the example when using *[html]*, the web-component functionality exposed in m is: `html` and `css`. As the names suggest to create the HTML layout and set the CSS styling. The module returns a class describing the component state and behavior, that will be created for every instance of the web-component. For more information about building web-components see the [blog](link:#/posts/20221129-webpages-with-mdlr.md).  Naturally these `mdlr-tutorials` pages are built with *[html]* modules [github](https://github.com/kootstra-rene/mdlr-tutorials/tree/main/user/blog).

## Differences with other module systems

As mentioned before MDLR does not support import/export but uses m.require/return instead. To understand why MDLR does so we need to understand what import/export entails. From [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) we get the folowing example: ```import { foo, bar } from "/modules/my-module.js";```
So we get the `foo` and `bar` functionality from the file */modules/my-module.js*.  
  
This simple line has several implications:
- there is a need to export foo and bar from a file
  - how do we export?
  - what needs to be adapted?
    - JavaScript language?
    - V8, Node, Deno, JavaScriptCore?
    - Browsers?
- there is a need to load the file
  - where is the file located?
    - what is the folder structure?
  - what if there are packages?
    - folder stucture for multiple packages?
  - what if I want to change the folder structure?
    - do I need to change my code?
    - do I need to change my tests?  
  
All the questions above result in:
- long adoption cycles
- complex code to handle partial adoption (Polyfill, Transpiling)
- a lot more tooling. 
- an inability to change without effort.
  
All these things are part of my *itch-factor* so I wanted to design a module system that has none of that, save some minimalistic tooling. So I started out with some requirements:  
1) no file reference in the modules.  
2) import/export functionality.  
3) combine modules together in a single bundle.  
  
Well step 3 is only feasable after step 1 and 2 so the focus was one those steps.  
Step 1 was easy, if you can't have file references you do it by id or name.  
Step 2 was in hindsight also relatively easy, to import you need to be able to get the modules from a registry and in order to do that module first need to be added to the registry. The first POC really was:
```
const m = (() => {
  const registry = {};
  return (name, something) => {
    registry.add(name, something);
  }
})();  
  
m('my-module', {});
```
That solved the adding but getting a module from the registry was a different story. I was working with Node at the time and I liked the `require` but disliked the fact that it was a global method. So to be able to provide the require function to the user, that user needs to provide a callback which the framework could call. That immediatly solved my `something` and lead to the following module definition.
```
m('my-module', m => {
  m.require('some-module');
})
```  

So I had the import, the next this was the export. Well if my definition is a function anyway then the return could be its export.
```
m('some-module', m => {
  return { value: 42 };
})  
  
m('my-module', m => {
  const { value } = m.require('some-module');
})
```  

Well then I changed m to mdlr because my strong favor for modular development and the MDLR Module System was born, in plain JavaScript and with one global `mdlr`.