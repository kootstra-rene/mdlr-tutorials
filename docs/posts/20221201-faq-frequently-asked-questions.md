---
title: "Frequently asked questions about mdlr"
tldr: "A conversation between a mdlr developer and a critical bystander"
author: "Maarten Metz"
tags: ["faq"]
---

## Javascript is slow

*I see you're using Javascript. I would never do that. Javascript is terribly slow. I want my software to be fast.*
  
  
We've noticed that the programmer is often much more influential in the performance of the program than the language s/he's using. Of course there are special cases where you need to get 'down to the metal' to squeeze out every last bit of performance the machine has to offer. We haven't encountered those cases in our day to day job or in our hobby projects yet. And these include a playstation emulator (allowing you to play playstation games in the browser), a raytracer (computationally quite expensive), a high performance datalake in the cloud, and several other frontend and backend projects.

## I hate Javascript

*Listen, whatever problem you have to solve, javascript will make it worse! Last month I had to update a package because some security vulnerability was found. It took me almost a day to figure out it couldn't be done because of conflicts with other packages! Somehow I always end up in these kinds of time drains when using javascript. I want to spend my time helping customers, not fiddling around with my language.*
  
  
We agree with that last statement! Often when people have strong negative feelings about javascript, they have bad experiences with the javascript *ecosystem*, not necessarily the language. After all, javascript is just a C-style language, not THAT different from other C-style languages like Python, C#, Java, etc. 
  
  
We agree that the ecosystem is horrible. Therefore, we rarely use it. You'll find no `package.json` files in our projects. Just like you, we like to spend our time creating value for our customers, not fiddle around with packages, or waiting for transpilers / builds / whatever. We love quick feedback and javascript can be perfect for that ... if you use it properly. 
  
  
As developers, we should also look at our own actions. If you insist on using (huge) packages for the simplest tasks, you're part of the problem. You don't need `express` to make a `http` call or create a web server. You don't need `react` to route requests to the correct handler, or manage your application state. Most functionality is already available on frontend and backend. Most packages have (invisible) maintenance costs, and add almost [no or even negative value](https://www.npmjs.com/package/none) (well ... at least this package sparks some joy).
  
  
```
var none = function(){};
```
  
  
Try to pull apart your revulsion towards a language (in general) and its ecosystem. Most popular languages are not *that* different. 

## Javascript is not statically typed

*Well maybe you're right about the ecosystem, but the language itself is terrible as well. It's not even statically typed! I have no time to figure out what kind of object with what kind of properties is returned from a function. I want to have a static type and I want the compiler to make sure my program is correct.*
  
  
Fair enough. People have different preferences. Use whatever tools that make you and your team productive. We're quite productive with `mdlr`.

## You're reinventing the wheel!

*I can't believe your 'no dependencies' / 'vanilla js' approach! That is so unproductive! Think of all the thoroughly tested packages out there that deliver the exact functionality you need, but with better performance and more robustness than you will ever deliver! I want to laser focus on my customers' use case and use available software for everything else.*
  
  
We agree on focussing on the customer use case. It's just that we want to focus on the customer use case during the whole lifetime of the software, including maintenance and support. Furthermore, we also believe that we shouldn't reinvent the wheel. We noticed that a lot of programmers simply do not know how much functionality is already available out-of-the-box in Node and in browsers. If we have to bet on performance & robustness of your-package-of-choice and already available functionality in Node and in browsers, we'd bet on the latter. That functionality is definitely supported over long timespans, and very likely more battle tested than the bright and shiny package you think you need.
  
  
In addition, we also (sometimes) use (parts of) external packages. But in those cases we'll take full responsibility. We try to only include the parts we need, we make sure there are no vulnerabilities and no infinite chains of transitive dependencies. Depending on the license, we learn from other peoples code, build something similar, and attribute the original authors. From then on, we maintain that good-enough-for-our-usecase code ourselves.

## I'm still not convinced ... but now I'm at least more open to hear your elevator pitch

- Javascript has reach
- Vanilla Javascript is *very* powerful
- Javascript engines offer high performance functionality for nearly all things you can dream of
- `mdlr` adds a superfast feedbackloop to that, both on frontend and backend
- `mdlr` adds convenience functions like `chain` and `foreach` in the mix that help composing async flows, without (but not excluding) the callback hell and without (but not exluding) poluting your code with lots of `Promises` or `async` `await`s. (more on that in another blog)
- `mdlr` decouples the way you organise your files on disk from the way you organise your modules which supercharges refactoring
- with `mdlr` there is no difference between your development and production environment
- `mdlr` is fast and small and not a production dependency.
  
  
[What are you waiting for?!](link:#/posts/20221107-getting-started.md)
