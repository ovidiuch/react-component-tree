> ## Deprecated
> This package has been merged into the [React Cosmos](https://github.com/react-cosmos/react-cosmos) [monorepo](https://github.com/react-cosmos/react-cosmos/tree/master/packages).

# React Component Tree [![Build Status](https://travis-ci.org/skidding/react-component-tree.svg?branch=master)](https://travis-ci.org/skidding/react-component-tree) [![Coverage Status](https://coveralls.io/repos/skidding/react-component-tree/badge.svg?branch=master)](https://coveralls.io/r/skidding/react-component-tree?branch=master)

Serialize and reproduce the state of an entire tree of React components.

A few examples where this can be useful:
- Using fixtures to load and test components in multiple supported states
- Extracting the app state when an error occurs in the page and reproducing
that exact state later on when debugging
- "Pausing" the app state and resuming it later (nice for games)

React compatibility:
- `react-component-tree@0.2` with `react@0.13` and below
- `react-component-tree@0.4` with `react@0.14` and above

## ComponentTree.serialize

Generate a snapshot with the props and state of a component combined, including
the state of all nested child components.

```js
var ComponentTree = require('react-component-tree');

myCompany.setProps({public: true});
myCompany.setState({profitable: true});
myCompany.refs.employee54.setState({bored: false});

var snapshot = ComponentTree.serialize(myCompany);
```

The snapshot looks like this:
```js
{
  public: true,
  state: {
    profitable: true,
    children: {
      employee54: {
        bored: false
      }
    }
  },
}
```

## ComponentTree.render

Render a component and reproduce a state snapshot by recursively injecting the
nested state into the component tree it generates.

```js
var myOtherCompany = ComponentTree.render({
  component: CompanyClass,
  snapshot: snapshot,
  container: document.getElementById('content')
});

console.log(myOtherCompany.props.public); // returns true
console.log(myOtherCompany.state.profitable); // returns true
console.log(myOtherCompany.refs.employee54.state.bored); // returns false
```
