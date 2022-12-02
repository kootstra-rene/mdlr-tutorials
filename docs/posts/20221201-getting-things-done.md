---
title: "Getting things done()"
tldr: "No (empty) promises; we get things done()"
author: "Maarten Metz"
tags: ["code"]
---

## Introduction

What are the different ways to call a function in javascript?
  
  
- Normal function call
- Function call with callback argument(s)
- Function call that returns a `Promise`
- Function calls wrapped in `async` / `await` keywords (which are essentially syntactic sugar on top of Promises) 
  
... and then there is the mdlr way that uses `done()` in functions that are part of the flow of your program. We're assuming you've seen and used normal function calls, callbacks, Promises and async / await before. If not: no problem. `mdlr` can work with all of them like you would in a normal javascript environment. It's just that `mdlr` prefers to get things `done()`.
  
## done()

`done()` is a callback like you are used to, but without the callback hell. Let's look at the signature of a done function, the way it is expected by `mdlr`: `function done(error = null, ...args)`. This means that whenever `mdlr` requires a function with a `done` parameter, it expects done to be called like this:
  
  
- `done(null, ...args)` at the end of happy paths
- `done(new Error(), ...args)` at the end of Error paths
  
Instead of `done(null)`, `done()` is also allowed. 
  

Let's first write a small program that uses the same pattern to see how all this works in practice.

// TODO: explain user/posts-code/gtd.js code

