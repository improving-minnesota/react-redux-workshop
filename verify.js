var workshopSetup = require('./scripts/workshop-setup');

var verifySystem = workshopSetup.verifySystem;

verifySystem([
  verifySystem.validators.node('>=5.0.0'),
  verifySystem.validators.yarnNpm('>=0.30.0', '>=3.0.0')
])
  .then(function () {
    console.log('🎉  Congrats! Your system is setup properly')
    console.log('You should be good to install and run things.')
  })
  .catch(function (err) {
    console.error(err);
  });
