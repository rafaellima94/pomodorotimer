import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import MainScreen from './screens/MainScreen'

const routes = [
  {
    path: '/',
    component: MainScreen
  },
];

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
