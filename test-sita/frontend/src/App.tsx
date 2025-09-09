import React from 'react';


// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// Layouts
import GameLayout from './layout/gameLayout/GameLayout';


// Pages
import List from "./pages/list/List"
import Search from "./pages/search/Search"
import Top from "./pages/top/Top"
import Team from "./pages/team/Team"
import Start from './pages/start/Start';

function App() {

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path='/'>
            <Start />
          </Route>

          <Route exact path='/list'>
            <GameLayout>
              <List />
            </GameLayout>
          </Route>
          <Route exact path='/search'>
            <GameLayout>
              <Search />
            </GameLayout>
          </Route>
          <Route exact path='/top'>
            <GameLayout>
              <Top />
            </GameLayout>
          </Route>
          <Route exact path='/team'>
            <GameLayout>
              <Team />
            </GameLayout>
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
