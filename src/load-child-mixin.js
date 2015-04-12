var loadChild = require('./load-child.js');

exports.Mixin = {
  loadChild: function(childName, a, b, c, d, e, f) {
    return loadChild.loadChild(this.children, childName, a, b, c, d, e, f);
  }
};
