var _ = require('lodash'),
    loadChild = require('../src/load-child.js'),
    Mixin = require('../src/load-child-mixin.js');

describe('Load child mixin', function() {
  var fakeReactElement = {},
      fakeComponent;

  beforeEach(function() {
    sinon.stub(loadChild, 'loadChild').returns(fakeReactElement);

    fakeComponent = _.clone(Mixin);
    fakeComponent.children = {};
  });

  afterEach(function() {
    loadChild.loadChild.restore();
  });

  it('should call loadChild lib with same args', function() {
    fakeComponent.loadChild('myChild', 5, 10, true);

    var args = loadChild.loadChild.lastCall.args;
    expect(args[0]).to.equal(fakeComponent.children);
    expect(args[1]).to.equal('myChild');
    expect(args[2]).to.equal(5);
    expect(args[3]).to.equal(10);
    expect(args[4]).to.equal(true);
  });

  it('should return what loadChild lib returned', function() {
    expect(fakeComponent.loadChild()).to.equal(fakeReactElement);
  });
});
