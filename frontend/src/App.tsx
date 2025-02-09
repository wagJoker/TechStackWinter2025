import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArtworkList from './components/ArtworkList';
import ArtworkForm from './components/ArtworkForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ArtworkList} />
          <Route path="/add" component={ArtworkForm} />
          <Route path="/edit/:id" component={ArtworkForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;