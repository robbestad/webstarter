/*
 Example file to show how to set up a skeleton test
 */
const {asKey} = require('../../src/components/helpers/render');
const path = require('path');
const assert = require('assert');
describe('asKey test', () => {
  it('verifies that asKey removes spaces, norwegian characters and special keys', function () {
    assert.equal(asKey("Dette... er en dårlig tittel!"), "detteerendrligtittel");
  });
});
