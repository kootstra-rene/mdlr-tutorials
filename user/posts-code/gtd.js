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
  const { foreach } = m.require('foreach');
  const { getUser, getUserDetails, storeUserDetails } = m.require('external-callback-api');

  function callbackHacker(){
    getUser("CB", (_, user) => {
      getUserDetails(user, (_, userDetails) => {
        storeUserDetails(userDetails, (_, result) => {
          console.log('callback: ' + result);
        });
      });
    });
  }

  function mdlrHacker(){
    chain([getUser, getUserDetails, storeUserDetails]).do("MD", (_, result) => {
      console.log('mdlr: ' + result);
    });
  }

  const credentials = ['MM', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II'];

  foreach(credentials).with({concurrency: 4}).do(hackUser, () => {
    console.log('All Users Hacked!');
  });

  function hackUser({ v: credential }, done){
    chain([getUser, getUserDetails, storeUserDetails]).do(credential, (_, result) => {
      console.log('mdlr: ' + result);
      done(null);
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
      .then(result => console.log('promise: ' + result));
  }

  async function asyncAwaitHacker(){
    const user = await getUser("AA");
    const userDetails = await getUserDetails(user);
    const result = await storeUserDetails(userDetails);
    console.log('async await: ' + result);
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

mdlr('credentials-reader', m => {

  // Usage:
  // curl -s --insecure 'https://localhost:8443/bundler/node?unit=\[unit\]credentials-reader' | gunzip | node -

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

});

