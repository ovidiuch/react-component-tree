var React = require('react'),
    render = require('../src/render.js').render;

describe('Render', function() {
  var domContainer;

  class Component extends React.Component {
    render() {
      return React.DOM.span();
    }
  }

  beforeEach(function() {
    sinon.spy(React, 'createElement');
    sinon.stub(React, 'render');

    domContainer = document.createElement('div');
  });

  afterEach(function() {
    React.createElement.restore();
    React.render.restore();
  });

  it('should create element for component', function() {
    render({
      component: Component,
      snapshot: {foo: 'bar'},
      container: domContainer
    });

    var args = React.createElement.lastCall.args;
    expect(args[0]).to.equal(Component);
  });

  it('should create element with props', function() {
    render({
      component: Component,
      snapshot: {foo: 'bar'},
      container: domContainer
    });

    var args = React.createElement.lastCall.args;
    expect(args[1].foo).to.equal('bar');
  });

  it('should render created element', function() {
    render({
      component: Component,
      snapshot: {foo: 'bar'},
      container: domContainer
    });

    var args = React.render.lastCall.args;
    expect(args[0]).to.equal(React.createElement.returnValues[0]);
  });

  it('should render in given container', function() {
    render({
      component: Component,
      snapshot: {foo: 'bar'},
      container: domContainer
    });

    var args = React.render.lastCall.args;
    expect(args[1]).to.equal(domContainer);
  });
});
