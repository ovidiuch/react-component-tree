var React = require('react'),
    loadChild = require('../src/load-child.js').loadChild;

describe('Load missing child', function() {
  var childTemplates;

  beforeEach(function() {
    childTemplates = {
      missingChild: function() {
        return {};
      }
    };

    sinon.stub(React, 'createElement', function() {
      throw new Error('Invalid component');
    });

    sinon.stub(console, 'error');
  });

  afterEach(function() {
    React.createElement.restore();

    console.error.restore();
  });

  it('should handle exception', function() {
    expect(function whereAreYouSon() {
      loadChild(childTemplates, 'missingChild');
    }).to.not.throw();
  });

  it('should log error', function() {
    loadChild(childTemplates, 'missingChild');

    expect(console.error.lastCall.args[0]).to.be.an.instanceof(Error);
  });
});
