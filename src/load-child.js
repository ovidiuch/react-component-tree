var _ = require('lodash'),
    React = require('react');

module.exports = function(childTemplates, childName, a, b, c, d, e, f) {
  /**
   * Create a React element for a specific child type.
   *
   * The component class and props of the child are returned together by a
   * corresponding function from the childTemplates object. The functions are
   * mapped with the name of the child as the key.
   *
   * https://facebook.github.io/react/docs/top-level-api.html#react.createelement
   *
   * @param {Object} childTemplates Map of functions that generate child
   *                                component params (component+props)
   * @param {String} name Key that corresponds to the child component we want
   *                      to get the params for
   * @param {...*} [arguments] Optional extra arguments get passed to the
   *                           component template function
   *
   * @returns {ReactElement} Created React element
   *
   * @example
   * loadChild({
   *   profileBadge: function(user) {
   *     return {
   *       component: require('./components/ProfileBadge.jsx'),
   *       key: user.id,
   *       name: user.name,
   *       showAvatar: true
   *     };
   *   }
   * }, 'profileBadge', {id: 3, name: 'John'});
   * // will call
   * React.createElement(ProfileBadge, {
   *   key: 3,
   *   name: 'John',
   *   showAvatar: true
   * });
   */
  var params = getChildParams.call(
      this, childTemplates, childName, a, b, c, d, e, f);

  // One child with bad params shouldn't block the entire app
  try {
    return React.createElement(params.component,
                               _.omit(params, 'component'));
  } catch (e) {
    console.error(e);
  }
};

var getChildParams = function(childTemplates, childName, a, b, c, d, e, f) {
  var params = childTemplates[childName].call(this, a, b, c, d, e, f);

  // Default the child ref to its key name if the template doesn't return a
  // value
  if (!params.ref) {
    params.ref = childName;
  }

  return params;
};
