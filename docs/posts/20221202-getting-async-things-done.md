---
title: "Getting async things done()"
tldr: "No (empty) promises; we get things done()"
author: "Maarten Metz"
tags: ["code"]
---

## Introduction

What are the different ways to put asynchronous functions to use in javascript?
  
  
- Function call with callback argument(s)
- Function call that returns a `Promise`
- Function calls wrapped in `async` / `await` keywords (which are essentially syntactic sugar on top of Promises) 
  
... and then there is the mdlr way that uses `done()` in functions that are part of the flow of your program. We're assuming you've seen and used callbacks, Promises and async / await before. If not: no problem. `mdlr` can work with all of them like you would in a normal javascript environment. It's just that `mdlr` prefers to get things `done()`.
  
## done()

`done()` is a callback like you are used to, but without the callback hell. Let's look at the signature of a done function, the way it is expected by `mdlr`: `function done(error = null, ...args)`. This means that whenever `mdlr` requires a function with a `done` parameter, it expects done to be called like this:
  
  
- `done(null, ...args)` at the end of happy paths
- `done(new Error(), ...args)` at the end of Error paths
  
Instead of `done(null)`, `done()` is also allowed. 
  
  
Let's first write a small program that uses the same pattern to see how all this works in practice using the different mechanisms.

## user hack

A malicious hacker acquired access to the credentials of one user of a very-important website. In 3 async calls s/he will have all your userdetails stored forever on the machine where the script runs. These async calls are:
  
  
- `User getUser(credentials)` (to get the user object from the server)
- `UserDetails getUserDetails(User)` (to get the userdetails from the server)
- `storeUserDetails(UserDetails)` (to store locally)
  
Let's - for the sake of comparison - not worry about the details (like worrying if a value or a promise is returned) and compare the 4 approaches:

```
function callbackHacker() {
  getUser("CB", (_, user) => {
    getUserDetails(user, (_, userDetails) => {
      storeUserDetails(userDetails, (_, result) => {
        console.log('callback: ', result);
      });
    });
  });
}
  
function promiseHacker() {
  getUser("PM")
    .then(user => getUserDetails(user))
    .then(userDetails => storeUserDetails(userDetails))
    .then(result => console.log('promise: ' + result));
}
  
async function asyncAwaitHacker() {
  const user = await getUser("AA");
  const userDetails = await getUserDetails(user);
  const result = await storeUserDetails(userDetails);
  console.log('async await: ' + result);
}
  
function mdlrHacker() {
  chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
    console.log('mdlr: ' + result);
  });
}
```

## Huge user leak

Now things have gotten worse for the very-important website maintainers; thousands of user credentials have leaked out onto the internet and hackers are eager to store all the userDetails they can get their hands on. The credentials are served on the web in a `CSV` file with the following structure:
  

```
someId, credentials, stuff, we, dont, care, about
23, MM, bla, dinges, fietsbel, foo, bar
42, YY, more, things, that, dont, matter
.. etc.
```

Let's see what kind of code our `mdlr` hacker would write to convert the `csv` into a list of credentials.
  
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

That works! The `mdlr` hacker was productive again, switching to the backend just as easily as to the frontend, using industry-standard error-first callbacks to interact with Node ... and using them in the `mdlr` code as well.

## Hack all the users! 

Given the list of credentials, the `mdlr` hacker will now reuse the function created during the first hack.

### foreach

As a reference: the old `mdlr` function:

```
function mdlrHacker(){
  chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
    console.log('mdlr: ' + result);
  });
}
```

The new code:

```
foreach(credentials).do(hackUser, () => {
  console.log('All Users Hacked!');
});
  
function hackUser({ v: credential }, done){
  chain([getUser, getUserDetails, storeUserDetails]).do(credential, (_, result) => {
    console.log('mdlr: ' + result);
    done(null);
  });   
}
```

What happened here? Let's first take a look at the `foreach` spec: `foreach(collection).do(action, ...args, done)`. Not surprisingly, `foreach` accepts a collection: an array, an object, etc. In this case we give it an array of `credentials`. 
  
  
Next it requires an `action` that needs to be handled for each element: `hackUser` in this case. The action needs to have an error-first `done` callbackhandler as its last parameter. Its first parameter is the item in the collection where the action should be applied to. This item is delivered as a `{k: key, v: value}` pair in an object by the `foreach` function. The `key` contains the key in the collection (the index in case of an array, the propertyname in case of an object). The `value` contains the item value; one credential in our case. In our `hackUser` action we destructure that first argument and rename the item that is in `v` to `credential`.
  
  
So therefore, it's now possible to reuse the old function with the `chain` inside and be `done()` very quickly. But our `mdlr` hacker is still not completely happy. The `.csv` file is long, and the delays in all these async functions are annoying. S/he would like to introduce some concurrency, but not too much ... too much calls will cause the hacker to be blocked by the very-important website rate limiting.

### Concurrency

After some experimentation, it turns out our hacker can spin of 42 concurrent chains. That way, the API won't block the script, and all the users will be hacked a lot faster. The only thing that needed to be `done()` was to add `.with({concurrency: 42})` to the code:
  

```

foreach(credentials).with({concurrency: 42}).do(hackUser, () => {
  console.log('All Users Hacked!');
});

```

Yup, it's that simple! 🤓

## Recap

The async code to hack all users:

```
foreach(credentials).with({concurrency: 42}).do(hackUser, () => {
  console.log('All Users Hacked!');
});
  
function hackUser({ v: credential }, done){
  chain([getUser, getUserDetails, storeUserDetails]).do(credential, (_, result) => {
    console.log('mdlr: ' + result);
    done(null);
  });   
}
```

Let's read that as an experienced `mdlr` developer:
  
  
- for each 'credential' concurrently 'hackUser', which means
- 'getUser', 'getUserDetails', 'storeUserDetails' in sequence and then log the result
- finally let me know the script has succeeded
  
No callbackhell, no promises, no async await. Small, focused functions. 
  
  
The contracts we needed to take into account to achieve this:
  
  
- error-first 'done()' callback handler: `done(error = null, ...args)`
- `chain(collection).do(data, ...args, done)` where `data` is the data at the start of the chain
- `foreach(collection).do(action, ...args, done)` with `action` signature:
- `action(entry, ...args, done)` where `entry === {k: key, v: value}` 
  
It really pays off to memorize these contracts when working with `mdlr`. They all work together nicely, have similar interfaces and create synergy when used properly. They allow for construction of tree-like async workflows, while still allowing direct function calls and interaction with normal callbacks, Promises and async / awaits. In our experience, it allows for focused, short functions that are easy to compose.

## Conclusion

We started off comparing some ways of handling async functions in javascript. The callback example quickly evolved into a callback hell or callback Christmas Tree 🎄. The `Promise` and `async` `await` option look nicer, but require us to introduce Promises and add async/awaits throughout our code. The `mdlr` example gets things `done()` with industry-standard error-first callback handlers *without* the callback hell. Furthermore the `mdlr` way of getting things done still allows for normal callbacks, Promises or async/awaits to be used if an external package requires it.
  
  
Then we added 'looping-over-credentials' in the mix and worked out the example for the `mdlr` hacker. Furthermore, concurrency was added quite easily. All the while, the `mdlr` functions remained short, sweet and focused. Finally, using the `chain`, `foreach`, `action` and error-first `done` signatures, we have full control over error paths, logging, workflow composition and function signatures. Pretty neat.
  
  
How would **you** add looping and concurrency using callbacks, promises or async/awaits? What does the code look like in those cases? What are the costs and benefits of doing it that way? How does your async code evolve when usecases change?