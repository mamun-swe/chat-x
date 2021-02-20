import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UsersIndex from './pages/users/Index'
import ChatRoom from './pages/chat/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UsersIndex} />
          <Route exact path="/chat-room/:name/:id" component={ChatRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
