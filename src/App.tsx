import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import FooterBar from './components/FooterBar';

import { Layout } from 'antd';
import DetailPage from './pages/DetailPage';

const { Content } = Layout;

const App: React.SFC = (): JSX.Element => {
  return (
    <Router>
      <NavigationBar />
      <Content style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "4rem", paddingBottom: "4rem", marginLeft: "auto", marginRight: "auto" }} >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
        </Switch>
      </Content>
      <FooterBar />
    </Router>
  );
}

export default App;
