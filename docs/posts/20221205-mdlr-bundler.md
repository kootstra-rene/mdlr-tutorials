---
title: "MDLR - The Bundler"
tldr: "Explanation of the MDLR bundler"
author: "Rene Kootstra"
tags: ["introduction"]
---

This blog gives an overview of the mdlr-bundler and is a continuation of the [The Module System](link:#/posts/20221202-mdlr-basics.md).

## Bundling modules

In the previous blog we found the example:  
```
mdlr('console', m => {
  return { console };
})
  
mdlr('hello-world', m => {
  const { console } = m.require('console');
  
  console.log('hello world!');
})
```
This contains 2 modules, namely: `console` and `hello-world`. In its essence these 2 modules put in a single file is already a bundle. 
The only thing that is then missing, is the invocation of the `hello-world` module. So how can we achieve that invocation.
As `mdlr('hello-world, m => { ... })` is the definition of a module, a simple way to do the invocation is `mdlr('hello world')`.  
  
So the whole bundle will be:
```
mdlr('console', m => {
  return { console };
})
  
mdlr('hello-world', m => {
  const { console } = m.require('console');
  
  console.log('hello world!');
})
  
mdlr('hello world');
```
  
*Wait bundling can't be that easy?*  Well if you leave out: minification and obfuscation then actually it is that simple. The people with C/C++ knowledge knows that the order of including the header files and the compiled objects is really neccessary and a pain sometimes, but MDLR does not have that problem. The definition `mdlr('hello-world, m => { ... })` is key to that. It actually only adds a function `m => {...}` to the module cache under the key 'hello-world'. That function is actually a builder function that creates the module at the moment it is required via `m.require`. This means a bundle can be a concatenation of module definitions in any order folowed by the invocation of the 'main' module. It really is that simple. Finding the required modules is also easy by just parsing the module definitions and adding the modules that are included via `m.require`.  
  
Oke it's slightly more complex due to the different module types, but even then the core concept described here holds. So the complexity increase is minimal.

## Backend, Frontend and Test bundles

There are different needs depending on the type of bundle. A backend bundle likely needs to be stored as a file to be run with a JavaScript runtime. A frontend bundle could be a file containing the JS but could also be the .html file. The test bundle... well depends what are you testing: the frontend or the backend. So different scenarios lead to different bundlers and different usage of the bundler.  
  
Again something I don't like for two reasons:  
1) I like uniformity  
2) I don't like too much restrictions for the users  
  
MDLR solves this by having a bundler-api that bundles on-the-fly and returns the bundle for the specific module type. Type `html` will give a html document containing the web-app and type `node` will give a JavaScript document. 

If you started `mdlr-tutorials` via docker then you can:  
In the browser type: `https://localhost:8443/bundler/html?unit=[html]mdlr-blog` or [click here](https://localhost:8443/bundler/html?unit=[html]mdlr-blog).  
You should see the mdlr-blog web app.  
  
If you wish to save the mdlr-blog as a file from the commandline, type: `curl --insecure 'https://localhost:8443/bundler/html?unit=[html]mdlr-blog' | gunzip > blog.html`.  

If you have an app that runs with node type: `https://localhost:8443/bundler/node?unit=... | gunzip | node -` and it will run.  

If you don't like the command-line you can always make a script that makes it easier.  
  
But mdlr will only provide the bundle-api.

For a typical web-app usecase have a look at the [mdlr-realworld](https://github.com/kootstra-rene/mdlr-realworld) repo.