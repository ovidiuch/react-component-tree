module.exports = {
  Mixin: require('./load-child-mixin.js'),
  Component: require('./load-child-component.js'),
  loadChild: require('./load-child.js'),
  serialize: require('./serialize.js').serialize,
  render: require('./render.js').render,
  injectState: require('./render.js').injectState
};
