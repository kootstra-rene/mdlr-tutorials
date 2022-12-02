mdlr('external-callback-api', m => {

  function getUser(name, done){
    setTimeout(() => {
      const id = (Math.random() * 10000) >>> 0;
      done(null, {name, id});
    }, 500);
  }

  function getUserDetails(user, done){
    setTimeout(() => {
      const userDetails = Object.assign({}, user, {details: user.name + " userDetails"});
      done(null, userDetails);
    }, 500);
  }

  function storeUserDetails({name, id, details}, done){
    setTimeout(() => {
      console.log(`${name}, ${id}, ${details}`);
      done(null, `${name} was hacked.`);
    }, 500);
  }

  return { getUser, getUserDetails, storeUserDetails }

});

mdlr('external-promise-api', m => {

  const {getUser: gu, getUserDetails: gud, storeUserDetails: sud } = m.require('external-callback-api');
  const { promisify } = m.require('promise');

  function getUser(name, done){
    return promisify(gu, name);
  }

  function getUserDetails(user, done){
    return promisify(gud, user);
  }

  function storeUserDetails(userDetails, done){
    return promisify(sud, userDetails)
  }

  return { getUser, getUserDetails, storeUserDetails }

});

mdlr('compare-callback', m => {

  const { chain } = m.require('chain');
  const { getUser, getUserDetails, storeUserDetails } = m.require('external-callback-api');

  function callbackHacker(){
    getUser("CB", (_, user) => {
      getUserDetails(user, (_, userDetails) => {
        storeUserDetails(userDetails, (_, result) => {
          console.log(result);
        });
      });
    });
  }

  function mdlrHacker(){
    chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
      console.log(result);
    });
  }

  console.clear();
  callbackHacker();
  mdlrHacker();

});

mdlr('compare-promise', m => {

  const { getUser, getUserDetails, storeUserDetails } = m.require('external-promise-api');

  function promiseHacker(){
    getUser("PM")
      .then(user => getUserDetails(user))
      .then(userDetails => storeUserDetails(userDetails))
      .then(result => console.log(result));
  }

  async function asyncAwaitHacker(){
    const user = await getUser("AA");
    const userDetails = await getUserDetails(user);
    const result = await storeUserDetails(userDetails);
    console.log(result);
  }

  console.clear();
  promiseHacker();
  asyncAwaitHacker();

});

mdlr('promise', m => {

  // convert a function using an error first callback into a 
  // function returning a promise
  function promisify(fn, ...args){
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) { return reject(error); }
        return resolve(result);
      });
    });
  }

  return { promisify }

});

mdlr('callback', m => {

  // convert a function returning a promise into a function  
  // using an error first callback
  function callbackify(fn, ...args){
    
  }


});