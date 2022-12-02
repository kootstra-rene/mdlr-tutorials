---
title: "Getting async things done()"
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

## user hack

A malicious hacker acquired access to the credentials of one user for a very-important website. In three async calls s/he will have all your userdetails stored forever on the machine where the script runs. These calls are:
  

- `User getUser(credentials)` (to get the user object from the server)
- `UserDetails getUserDetails(User)` (to get the userdetails from the server)
- `storeUserDetails(UserDetails)` (to store locally)
  

Let's - for the sake of comparison - not worry about the details (like worrying if a value or a promise is returned) and compare the 4 approaches:
  

```

function callbackHacker(){
  getUser("CB", (_, user) => {
    getUserDetails(user, (_, userDetails) => {
      storeUserDetails(userDetails, (_, result) => {
        console.log('callback: ', result);
      });
    });
  });
}

function promiseHacker(){
  getUser("PM")
    .then(user => getUserDetails(user))
    .then(userDetails => storeUserDetails(userDetails))
    .then(result => console.log('promise: ' + result));
}

async function asyncAwaitHacker(){
  const user = await getUser("AA");
  const userDetails = await getUserDetails(user);
  const result = await storeUserDetails(userDetails);
  console.log('async await: ' + result);
}

function mdlrHacker(){
  chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
    console.log('mdlr: ' + result);
  });
}

```
  

## Huge user leak

Now things have gotten worse for the very-important website maintainers; Thousands of user credentials have leaked out onto the internet and our hackers are eager to store all the userDetails they can get their hands on. The credentials are served on the web in a `CSV` file with the following structure:
  

```

someId, credentials, stuff, we, dont, care, about
23, MM, bla, dinges, fietsbel, foo, bar
.. etc.

```
  

Our hackers first write some code to pull out a list of credentials. The `mdlr` hackers code:
  

```

const { readFile } = m.require('[node]fs');

function read(path, done) {
  readFile(path, 'utf8', (error, body) => {
    if (error) return done(error);
    const records = []
    body.split('\n')
      .map(a => a.split(','))
      .map(([_, credentials]) => records.push(credentials.trim()));
    done(null, records);
  });
}

read("./user/posts-code/credentials.csv", (_, credentials) => {
  console.log(credentials);
});

```
  
  
## Hack all the users! 

Given the list of credentials, they will now reuse their functions that they created during their first hack:

### mdlr
  
```

// Our old function (for comparison):
function mdlrHacker(){
  chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
    console.log('mdlr: ' + result);
  });
}


// Our new function (adhering to the foreach spec)
function mdlrAction({v:credential}, done){
  chain([getUser, getUserDetails, storeUserDetails]).do(credential, (_, result) => {
    console.log('mdlr: ' + result);
    done(null);
  });   
}

// Using mdlr's foreach to loop over all credentials
foreach(credentials).do(mdlrAction, () => {
  console.log('mdlrAction done!');
});

```

### callback

