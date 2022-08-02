import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AllItems from './AllItems';
import Home from './Home';
import { Route, Link } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <Link to='/items'>Items</Link>
        </nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        </main>
        <div>
          <Route exact path='/items/' component={AllItems} />

          <Route exact path='/' component={Home} />
        </div>
      </div>
    </Router>
  );
};

export default Routes;
