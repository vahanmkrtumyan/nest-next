import React from 'react';
import './App.css';
import SignIn from './components/SignIn';
import { Route, Switch } from 'react-router';
import Products from './components/Products';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={() => <SignIn />} exact />
        <Route path="/register" component={() => <SignIn register />} />
        <Route path="/products" component={() => <Products register />} />
        {/* <SignUp/> */}
      </Switch>
    </>
  );
}

export default App;
