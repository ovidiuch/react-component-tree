module.exports = {
  Mixin: require('./src/load-child-mixin.js'),
  Component: require('./src/load-child-component.js'),
  loadChild: require('./src/load-child.js'),
  serialize: require('./src/serialize.js').serialize,
  render: require('./src/render.js').render,
  injectState: require('./src/render.js').injectState
};
