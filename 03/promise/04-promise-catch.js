// ВОПРОС - есть ли разница между .then(ok, fail) VS .then(ok).catch(fail) ?

new Promise( function(resolve, reject) {
  // ...

}).then( function(result) {
  // ...
  // throw new Error()
}).catch( function(err) {
  // ...
});

// vs

new Promise( function(resolve, reject) {
  // ...
}).then(
   function(result) { /*...*/ // throw new Error() },
   function(err) { /* ... */  // throw new Error() }
)

Promise.resolve()
  .then()
  .then()
  .catch(err => {
    if (err.name === 'myName') {
      ...
      return 'value';
    }

    throw err;
  })
  .then(v => ...) // v === 'value'
  .then()
  .then()
  .catch()
