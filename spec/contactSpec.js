describe('Contact', function() {
  var Contact = require('../src/contact.js');

  it('should parse the name', function() {
    expect(Contact.parseName('Ivan Dobrev, ivan@gmail.com')).toBe('Ivan Dobrev');
    expect(Contact.parseName(' Ivan Dobrev, ivan@gmail.com')).toBe('Ivan Dobrev');
    expect(Contact.parseName('Ivan Dobrev , ivan@gmail.com')).toBe('Ivan Dobrev');
    expect(Contact.parseName('  Ivan Dobrev , ivan@gmail.com')).toBe('Ivan Dobrev');
  });

  it('should parse the email', function() {
    expect(Contact.parseEmail('Ivan,ivan@gmail.com')).toBe('ivan@gmail.com');
    expect(Contact.parseEmail('Ivan, ivan@gmail.com')).toBe('ivan@gmail.com');
    expect(Contact.parseEmail('Ivan,ivan@gmail.com ')).toBe('ivan@gmail.com');
    expect(Contact.parseEmail('Ivan, ivan@gmail.com  ')).toBe('ivan@gmail.com');
  });

  it('should validate the email', function() {
    expect(Contact.validateEmail('ivan@gmail.com')).toBe(true);
    expect(Contact.validateEmail('ivan@gmail.co.uk')).toBe(true);
    expect(Contact.validateEmail('ivangmail.com')).toBe(false);
    expect(Contact.validateEmail('ivan@dobrev@gmail.com')).toBe(false);
    expect(Contact.validateEmail('ivan@gmail.co.uk.asdf')).toBe(false);
  });

  it('should add a contact in data.csv', function(done) {
    Contact.add('Ivan, ivan@gmail.com', function(err) {
      if (!err) done();
    });
  }, 1000);

  it('should find a contact by name', function(done) {
    Contact.find('Ivan', function(err, results) {
      if (!err) done();
    });
  }, 1000);
});
