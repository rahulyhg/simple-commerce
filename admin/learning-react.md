# Learning React

## Redux
### The Principles of Redux
1. The single immutable State tree.
2. Describe state changes with actions. An action is a simple JS object. changes to the tree are done via dispatching actions.
3. the state mutation of your app needs to be done via Pure functions.
    1. the reducer function gets previous state and current dispatched action as his arguments.
    2. reducer must handle unknown actions.
    3. if the reducer receives `undefined` as a state then the reducer must return the initial state
```js
const counter = (state = 0, action) => {

    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
```
4. Store Methods:
    0. before calling any methods you should create a store by passing the reducer function to `createStore(reducer)`
    1. `store.getState()`: get the current state of the store
    2. `store.dispatch({type: 'INCREMENT'})` : let's dispatch actions to change the state of your application
    3.  `store.subscribe(callback)` : it will call the callback every time an action is dispatched.
