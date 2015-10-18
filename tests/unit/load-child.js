var React = require('react'),
    loadChild = require('../../src/load-child.js').loadChild;

describe('Load child', function() {
  var FirstComponent = {},
      SecondComponent = {},
      component,
      children = [React.createElement('span', {
        key: '1',
        children: 'test child'
      })];

  beforeEach(function() {
    component = {
      children: {
        defaultRef: sinon.spy(function() {
          return {
            component: FirstComponent,
            alwaysTrue: true,
            children: children
          };
        }),
        customRef: sinon.spy(function() {
          return {
            component: SecondComponent,
            ref: 'fooChild'
          };
        })
      }
    };

    sinon.stub(React, 'createElement');
  });

  afterEach(function() {
    React.createElement.restore();
  });

  it('should call .children function', function() {
    loadChild(component, 'defaultRef');

    expect(component.children.defaultRef).to.have.been.called;
  });

  it('should call .children function with component context', function() {
    loadChild(component, 'defaultRef');

    expect(component.children.defaultRef).to.have.been.calledOn(component);
  });

  it('should call .children function with extra args', function() {
    loadChild(component, 'customRef', 'first', 'second');

    expect(component.children.customRef)
          .to.have.been.calledWith('first', 'second');
  });

  it('should create element using returned component class', function() {
    loadChild(component, 'defaultRef');

    expect(React.createElement.lastCall.args[0]).to.equal(FirstComponent);
  });

  it('should create element using returned props', function() {
    loadChild(component, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.alwaysTrue).to.equal(true);
  });

  it('should omit component param from props', function() {
    loadChild(component, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.component).to.be.undefined;
  });

  it('should omit children param from props', function() {
    loadChild(component, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.children).to.be.undefined;
  });

  it('should create element using returned children', function() {
    loadChild(component, 'defaultRef');

    expect(React.createElement.lastCall.args[2]).to.equal(children);
  });

  it('should use child name as ref if omitted', function() {
    loadChild(component, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.ref).to.equal('defaultRef');
  });

  it('should use returned ref when present', function() {
    loadChild(component, 'customRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.ref).to.equal('fooChild');
  });
});
