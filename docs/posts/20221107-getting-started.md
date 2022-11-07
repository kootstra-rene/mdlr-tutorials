---
title: "Getting Started"
tldr: "How to start with mdlr, no fluff just stuff."
author: "..."
tags: ["code"]
---

## Introduction

So you've decided to try mdlr and want to get started as soon as possible. You've came to the right place!

## MDLR prerequisites

These are the prerequisites for the recommended way of using mdlr:
  
  
- docker installed
- docker-compose installed
- browser installed (for frontend projects) AND / OR node installed (for backend projects)

## Setup project

- create `your-project` directory
- within `your-project` directory create `user` directory
- within the `user` directory create an empty `hello-world.js` file
- copy the docker-compose.yaml from [mdlr-tutorials](https://github.com/kootstra-rene/mdlr-tutorials/blob/main/docker-compose.yaml) to the root of `your-project` directory
  
`your-project` folder should now look like this:
  
  
```
your-project
     |
     + - -  user
     |       |
     |       +- -  hello-world.js
     |
     + - -  docker-compose.yaml
```

## Create your first mdlr module

Now open up `hello-world.js` in your favorite code editor and paste in this code:

  
```
mdlr('my-hello-world-module', m => {

  alert("hello world!");

})
```

## Run mdlr engine and start coding!

Now run `docker-compose up` from the root of `your-project` directory.

If you follow [this link,](https://localhost:8443/bundler/html?unit=[unit]my-hello-world-module) this should result in an alert in your browser.
  
  
Congratulations, you've created and started your first mdlr module.

## How does this help me?!

TODO: link to blog that describes how modules require each other (for the impatient reader.
  
  
You might argue that you could just as easily create a `html` file with a `script` tag that points to a `hello-world.js` without the mdlr fluff. You could start your browser and load the functionality in that `js` file by browsing to that `html` file on your filesystem. No docker, docker-compose or mdlr needed.
  
  
You would be correct for this particular simple case. However:
  
  
- once you would point to multiple `js` files from your `html` page, you could get duplicate variable names and function names. Not so with mdlr.
- if you decided to rename or move your `js` file, you would have to change your `html` as well. Not so with mdlr. As long as the file stays somewhere in the `user` folder and the module name stays the same, mdlr will find it.
  
  
Yes, dude - you may say - this is why javascript modules where created. Why reimplement them yourself?!
  
  
Now you're getting to the core of the matter and (one of) the main reasons for creating mdlr. But that's a topic for another blog.
  

TODO: link to blog that describes the 'why' of mdlr

## Where to go from here?

Depending on your personality, you might want to:
  
  
- TODO: link to blog that describes how modules require each other
- TODO: link to blog that describes the why of mdlr