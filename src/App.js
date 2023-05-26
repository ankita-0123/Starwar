import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import CharacterPhoto from './components/CharacterPhoto';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CharacterList} />
        <Route path="/characters/:id" component={CharacterDetails} />
        <Route path="/characters/:id/details" component={CharacterPhoto}/>
      </Switch>
    </Router>
  );
};

export default App;



