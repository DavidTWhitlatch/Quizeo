import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'layouts/Layout';
import Landing from 'screens/Landing';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Layout currentUser={currentUser}>
      <Switch>
        <Route path='/'>
          <Landing />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
