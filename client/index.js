import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import requireAuth from './components/requireAuth';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="dashboard" component={requireAuth(SongList)} />
          <Route path="songs/new" component={requireAuth(SongCreate)} />
          <Route path="songs/:id" component={requireAuth(SongDetail)} />
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
