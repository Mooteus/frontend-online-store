import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
