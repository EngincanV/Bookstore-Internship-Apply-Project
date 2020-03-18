import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import FooterBar from './components/FooterBar';

import { Layout } from 'antd';

const { Content } = Layout;

const App: React.SFC = (): JSX.Element => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Content style={{ height: "calc(100vh - 4rem)", paddingTop: "4rem" }} >
          <Route exact path="/" component={HomePage} />
        </Content>
      </Switch>
      <FooterBar />
    </Router>
  );
}

export default App;
