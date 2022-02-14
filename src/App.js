import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

import PrivateRoute from './components/PrivateRoute/Index'
import DashboardMaster from './pages/dashboard/Master'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRoute path="/chat-room" >
            <DashboardMaster />
          </PrivateRoute>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
