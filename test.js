var test = require('tape');
var regexUrl = require('.');

function match(text) {
  return text.match(regexUrl)[0];
}

test('lonely url', function(t) {
  var text = 'https://github.com/substack/tape';
  t.ok(regexUrl.test(text), 'test');
  t.equal(match(text), text, 'match');
  t.end();
});

test('surrounded url', function(t) {
  var text = 'this is a https://github.com/substack/tape url';
  t.ok(regexUrl.test(text), 'test');
  t.equal(match(text), 'https://github.com/substack/tape', 'match');
  t.end();
});

test('with parameters', function(t) {
  var text = 'what is tape https://duckduckgo.com/?q=tape ?';
  t.ok(regexUrl.test(text), 'test');
  t.equal(match(text), 'https://duckduckgo.com/?q=tape', 'match');
  t.end();
});

test('with anchor', function(t) {
  var text = 'with anchor https://foo.com/#anchor ?';
  t.ok(regexUrl.test(text), 'test');
  t.equal(match(text), 'https://foo.com/#anchor', 'match');
  t.end();
});

test('with multiple urls', function(t) {
  var text = 'https://duckduckgo.com https://google.com';
  t.deepEqual(text.match(regexUrl), ['https://duckduckgo.com', 'https://google.com'], 'match');
  t.end();
});
