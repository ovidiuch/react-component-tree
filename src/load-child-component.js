var React = require('react'),
    loadChild = require('./load-child.js');

class LoadChildComponent extends React.Component {
  loadChild(childName, a, b, c, d, e, f) {
    return loadChild.loadChild(
        this.children, childName, a, b, c, d, e, f);
  }
}

module.exports = LoadChildComponent;
