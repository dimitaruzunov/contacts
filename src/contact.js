var fs = require('fs');

var Contact = Object.create(null);

Contact.parseName = function(str) {
  return str.split(',')[0].trim();
};

Contact.parseEmail = function(str) {
  return str.split(',')[1].trim();
};

Contact.validateEmail = function(email) {
  return /^[a-z0-9._]+@[a-z0-9]+(\.[a-z]+){1,2}$/i.test(email);
};

Contact.add = function(contact, done) {
  var email = this.parseEmail(contact);

  if (!this.validateEmail(email)) {
    return done(new Error('Invalid email'));
  }

  fs.appendFile('data/data.csv', contact + '\n', done);
};

Contact.find = function(name, done) {
  fs.readFile('data/data.csv', { encoding: 'utf8' }, function(err, data) {
    if (err) return done(err);

    data = data.split('\n');
    var results = data.filter(function(contact) {
      return name == this.parseName(contact);
    }, Contact);

    done(null, results);
  });
};

module.exports = Contact;
