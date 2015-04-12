var _ = require('lodash'),
    loadChild = require('../src/load-child.js'),
    LoadChildComponent = require('../src/load-child-component.js');

describe('Load child component', function() {
  var fakeReactElement = {},
      myComponent;

  class MyComponent extends LoadChildComponent {}

  MyComponent.children = {};

  beforeEach(function() {
    sinon.stub(loadChild, 'loadChild').returns(fakeReactElement);

    myComponent = new MyComponent();
  });

  afterEach(function() {
    loadChild.loadChild.restore();
  });

  it('should call loadChild lib with same args', function() {
    myComponent.loadChild('myChild', 5, 10, true);

    var args = loadChild.loadChild.lastCall.args;
    expect(args[0]).to.equal(MyComponent.children);
    expect(args[1]).to.equal('myChild');
    expect(args[2]).to.equal(5);
    expect(args[3]).to.equal(10);
    expect(args[4]).to.equal(true);
  });

  it('should return what loadChild lib returned', function() {
    expect(myComponent.loadChild()).to.equal(fakeReactElement);
  });
});
