# flux-shopping-cart

A Flux app that allows users to manage a shopping cart.

Based on the tutorial found at
https://scotch.io/tutorials/creating-a-simple-shopping-cart-with-react-js-and-flux.

## Demo

View a live demo at https://flux-shopping-cart.herokuapp.com/.

## How to use

```
git clone git@github.com:thinkswan/flux-shopping-cart.git
npm install
npm start
```

This will start a server at http://localhost:5000/.

## How to deploy

Click the button below to spin up your own copy of the app in a Heroku
instance.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## How it works

The app is bootstrapped by loading mock data into local storage, then using a
mock API to retrieve the data and use it to initialize the `ProductStore`.

Following the Flux architecture, React views trigger actions, which are then
sent to the dispatcher, which notifies any stores who have registered callbacks.

When the affected stores modify their data, they emit a `change` event, which
causes the `FluxCartApp` controller view to update its state. Changes are then
passed to child components via props.

The app is stateless, so refreshing the page will clear all items from the cart.

## License

MIT
