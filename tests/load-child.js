var React = require('react'),
    loadChild = require('../src/load-child.js').loadChild;

describe('Load child', function() {
  var FirstComponent = {},
      SecondComponent = {},
      childTemplates;

  beforeEach(function() {
    childTemplates = {
      defaultRef: sinon.spy(function() {
        return {
          component: FirstComponent,
          alwaysTrue: true
        };
      }),
      customRef: sinon.spy(function() {
        return {
          component: SecondComponent,
          ref: 'fooChild'
        };
      })
    };

    sinon.stub(React, 'createElement');
  });

  afterEach(function() {
    React.createElement.restore();
  });

  it('should call corresponding template function', function() {
    loadChild(childTemplates, 'defaultRef');

    expect(childTemplates.defaultRef).to.have.been.called;
  });

  it('should call corresponding template function with extra args', function() {
    loadChild(childTemplates, 'customRef', 'first', 'second');

    expect(childTemplates.customRef).to.have.been.calledWith('first', 'second');
  });

  it('should create element using returned component class', function() {
    loadChild(childTemplates, 'defaultRef');

    expect(React.createElement.lastCall.args[0]).to.equal(FirstComponent);
  });

  it('should create element using returned props', function() {
    loadChild(childTemplates, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.alwaysTrue).to.equal(true);
  });

  it('should use child name as ref if omitted', function() {
    loadChild(childTemplates, 'defaultRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.ref).to.equal('defaultRef');
  });

  it('should use returned ref when present', function() {
    loadChild(childTemplates, 'customRef');

    var props = React.createElement.lastCall.args[1];
    expect(props.ref).to.equal('fooChild');
  });
});
