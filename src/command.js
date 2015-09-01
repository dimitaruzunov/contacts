var Contact = require('./contact');

var Command = Object.create(null);

Command.parseOperation = function() {
  return process.argv[2];
};

Command.parseData = function() {
  return process.argv[3];
};

Command.executeOperation = function(done) {
  var operation = this.parseOperation();
  var command = Command[operation] || function(done) {
    done(new Error('Invalid command'));
  };
  command.bind(this)(done);
};

Command.add = function(done) {
  var data = this.parseData();
  Contact.add(data, done);
};

Command.find = function(done) {
  var data = this.parseData();
  Contact.find(data, function(err, results) {
    if (err) return done(err);

    results.forEach(function(contact) {
      console.log(contact);
    });

    done(null, results);
  });
};

module.exports = Command;
