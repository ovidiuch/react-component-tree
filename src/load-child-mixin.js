var loadChild = require('./load-child.js');

module.exports = {
  loadChild: function(childName, a, b, c, d, e, f) {
    return loadChild.loadChild(this.children, childName, a, b, c, d, e, f);
  }
};
