var Command = require('./src/command');

Command.executeOperation(function(err) {
  if (err) return console.log(err);
});
